import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Message } from 'primeng/api';

import { UserProfileService } from '../shared/services/index';
import { SharedService } from '../../core/services/shared/index';
import { LoadingService } from '../../core/services/loading/index';
import {
  EmailValidator,
  MaxLengthValidator,
  MinLengthValidator,
  RequiredValidator,
  PasswordsEqualValidator
} from '../../infrastructure/validations/index';
import { UserProfileModel } from '../../infrastructure/models/index';
import { PasswordValidator } from '../../infrastructure/validations';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public form: FormGroup;
  public card: CardModule;
  public submitted: boolean;
  public currentUser: IUserClaim;
  public formChangePassword: FormGroup;
  public display: boolean;
  public msgs: Message[] = [];
  public dialogMsgs: Message[] = [];
  public dialogSubmitted: boolean;
  public submitLoader = false;

  constructor(private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private sharedService: SharedService,
    private loadingService: LoadingService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.currentUser = this.sharedService.getData('currentUser');
    this.initForm();
    this.initChangePasswordForm();
    this.form.patchValue(this.currentUser);
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [RequiredValidator, EmailValidator, MaxLengthValidator.validate(255)]],
      firstName: ['', [RequiredValidator, MaxLengthValidator.validate(70)]],
      lastName: ['', [RequiredValidator, MaxLengthValidator.validate(70)]],
      typeID: ['', [RequiredValidator]],
    });
  }

  public initChangePasswordForm(): void {
    this.formChangePassword = this.fb.group({
      'currentPassword': ['', [RequiredValidator]],
      'password': ['', [RequiredValidator, MinLengthValidator.validate(6), MaxLengthValidator.validate(20), PasswordValidator.validate]],
      'confirmPassword': ['', [RequiredValidator, MinLengthValidator.validate(6), MaxLengthValidator.validate(20), PasswordValidator.validate]]
    }, {
        validator: PasswordsEqualValidator.validate('password', 'confirmPassword')
      });
  }

  public showDialog() {
    this.dialogMsgs = [];
    this.dialogSubmitted = false;
    this.initChangePasswordForm();
    this.display = true;
  }

  public onSubmit(): void {
    this.msgs = [];
    this.submitted = true;
    if (this.form.valid) {
      this.loadingService.display(true);
      this.submitLoader = true;
      const data = new UserProfileModel(this.form.value);
      this.userProfileService.update(data)
        .subscribe((res: IResponse<void>) => {
          if (res.success) {
            const user = Object.assign({}, this.currentUser, data);
            this.sharedService.setData(user, 'currentUser');
            this.messageService.add({ severity: 'success', detail: res.message });
            this.loadingService.display(false);
            this.submitLoader = false;
            this.submitted = false;
          } else {
            this.loadingService.display(false);
            this.submitLoader = false;
            this.messageService.add({ severity: 'error', detail: res.error.displayMessage });
          }
        },
          err => {
            this.loadingService.display(false);
            this.submitLoader = false;
            // this.msgs.push({severity: 'error', detail: appSettings.SERVER_ERROR_MESSAGE});
          });
    }
  }

  public changePassword(): void {
    this.dialogMsgs = [];
    this.dialogSubmitted = true;
    if (this.formChangePassword.valid) {
      this.loadingService.display(true);
      this.submitLoader = true;
      this.dialogSubmitted = true;
      this.formChangePassword.markAsUntouched();
      this.userProfileService.changePassword(this.formChangePassword.value)
        .subscribe((res: IResponse<void>) => {
          if (res.success) {
            this.formChangePassword.reset();
            this.msgs = [];
            this.display = false;
            this.messageService.add({ severity: 'success', detail: res.message });
          } else {
            this.dialogMsgs = [];
            this.messageService.add({ severity: 'error', detail: res.error.displayMessage });
          }
          this.dialogSubmitted = false;
          this.loadingService.display(false);
          this.submitLoader = false;
          this.formChangePassword.reset();
        }, (err) => {
          this.loadingService.display(false);
          this.submitLoader = false;
        });
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SetPasswordService } from '../shared/services';
import { Subscription } from 'rxjs/Subscription';
import { LoadingService } from '../../core/services';
import { Message } from 'primeng/api';
import { LocalizationService } from '../../core/services/localization';
import { SetPasswordModel } from '../../infrastructure/models';
import {
  MaxLengthValidator,
  MinLengthValidator,
  PasswordsEqualValidator,
  PasswordValidator,
  RequiredValidator
} from '../../infrastructure/validations';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public submitted = false;
  public submitLoader = false;
  public msgs: Message[] = [];
  private subscription = new Subscription();

  constructor(private fb: FormBuilder,
    protected router: Router,
    private route: ActivatedRoute,
    private localizationService: LocalizationService,
    private setPasswordService: SetPasswordService,
    private loadingService: LoadingService) {
    this.formInit();
  }

  ngOnInit() {
    const routeSubscribe = this.route.data.subscribe((data: any) => {
      if (data.info.success) {
        this.form.setValue(new SetPasswordModel(data.info));
      }
    });
    this.subscription.add(routeSubscribe);
  }

  private formInit(): void {
    this.form = this.fb.group({
      'code': [''],
      'email': [''],
      'password': ['', [RequiredValidator, MinLengthValidator.validate(6), MaxLengthValidator.validate(20), PasswordValidator.validate]],
      'confirmPassword': ['', [RequiredValidator, MinLengthValidator.validate(6), MaxLengthValidator.validate(20), PasswordValidator.validate]]
    }, {
        validator: PasswordsEqualValidator.validate('password', 'confirmPassword')
      });
  }

  public onSubmit(): void {
    this.msgs = [];
    this.submitted = true;
    this.submitLoader = true;
    if (this.form.valid) {
      this.loadingService.display(true);
      this.setPasswordService.resetPassword(new SetPasswordModel(this.form.value))
        .subscribe((data: IResponse<void>) => {
          if (data.success) {
            this.localizationService.navigateTo('login');
            this.submitLoader = false;
          } else {
            this.msgs.push({ severity: 'error', detail: data.error.displayMessage });
            this.submitLoader = false;
          }
          this.loadingService.display(false);
          this.submitLoader = false;
        }, (err) => {
          this.loadingService.display(false);
          this.submitLoader = false;
        });
    } else {
      this.submitLoader = false;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../shared/services/index';
import { Message } from 'primeng/api';
import { ForgotPasswordModel } from '../../infrastructure/models/index';
import { EmailValidator, MaxLengthValidator, RequiredValidator } from '../../infrastructure/validations/index';
import { LoadingService } from '../../core/services/loading/index';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;
  public email: AbstractControl;
  public submitted = false;
  public msgs: Message[] = [];
  public submitLoader = false;

  constructor(private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    protected router: Router,
    private loadingService: LoadingService) {
    this.formInit();
  }

  ngOnInit() {
  }

  private formInit(): void {
    this.form = this.fb.group({
      'email': ['', [RequiredValidator, EmailValidator, MaxLengthValidator.validate(255)]]
    });
    this.email = this.form.controls['email'];
  }

  public onSubmit(): void {
    this.msgs = [];
    this.submitted = true;
    this.submitLoader = true;
    if (this.form.valid) {
      this.loadingService.display(true);
      this.forgotPasswordService.forgotPassword(new ForgotPasswordModel(this.form.value))
        .subscribe((data) => {
          if (data) {
            if (data.success) {
              this.msgs.push({ severity: 'success', detail: data.message });
              this.submitLoader = false;
            } else {
              this.msgs.push({ severity: 'error', detail: data && data.error && data.error.displayMessage ? data.error.displayMessage : null });
              this.submitLoader = false;
            }
            this.loadingService.display(false);
          }
        }, (err: any) => {
          this.loadingService.display(false);
          this.msgs.push({ severity: 'error', detail: err });
          this.submitLoader = false;
        });
    } else {
      this.submitLoader = false;
    }
  }

}

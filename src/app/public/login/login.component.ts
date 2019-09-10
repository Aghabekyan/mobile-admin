import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Message } from 'primeng/api';
import { LoginModel } from '../../infrastructure/models/index';
import { AuthService } from '../../core/services/auth/index';
import { LoadingService } from '../../core/services/loading/index';
import { RequiredValidator, EmailValidator, MaxLengthValidator, MinLengthValidator } from '../../infrastructure/validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public user: LoginModel;
  public submitted: boolean;
  public rememberMeStatus: boolean;
  public submitLoader = false;
  public msgs: Message[] = [];
  private subscription = new Subscription();

  constructor(private fb: FormBuilder, protected router: Router, private authService: AuthService, protected route: ActivatedRoute, private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.initForm();
  }


  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [RequiredValidator, EmailValidator, MaxLengthValidator.validate(255)]],
      password: ['', [RequiredValidator, MinLengthValidator.validate(6), MaxLengthValidator.validate(20)]],
      rememberMe: [false],
    });
  }

  public onSubmit(): void {
    this.msgs = [];
    this.submitted = true;
    this.submitLoader = true;
    if (this.form.valid) {
      this.loadingService.display(true);
      this.user = new LoginModel(<ILogin>{
        email: this.form.value.email,
        password: this.form.value.password,
        rememberMe: this.form.value.rememberMe
      });
      const authSubscribe = this.authService.login(this.user)
        .subscribe((response => {
          this.authService.saveJwt(response['access_token'], 'access_token', this.user.rememberMe);
          const routeSubscribe = this.route.queryParams.subscribe((queryParam: any) => {
            if (queryParam['redirectUrl']) {
              const navUrl = queryParam['redirectUrl'] ? queryParam['redirectUrl'] : '/categories';
              this.router.navigateByUrl(decodeURIComponent(navUrl))
                .then(() => this.loadingService.display(false));
            } else {
              this.router.navigate(['home'])
                .then(() => this.loadingService.display(false));
            }
          });
          this.subscription.add(routeSubscribe);
        })
          , (err => {
            this.msgs = [];
            this.loadingService.display(false);
            this.msgs.push({ severity: 'error', detail: err.error.error_description });
            this.submitLoader = false;
          }));
      this.subscription.add(authSubscribe);
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


import {
  Component, OnDestroy,
  OnInit, ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../core/services/shared';
import {
  RequiredValidator,
  EmailValidator,
  MaxLengthValidator,
  PasswordValidator,
  PasswordsEqualValidator, MinLengthValidator
} from '../../infrastructure/validations';
import { UserRegisterService } from '../shared/services/register';
import { RegistrationModel } from '../../infrastructure/models';
import { ConfirmationService, Message, MessageService } from '../../../../node_modules/primeng/api';
import { LoadingService } from '../../core/services/loading';
import { enumToString } from '../../infrastructure/utils/index';
import {
  UserType,
  AccountStatus
} from '../../infrastructure/enums/index';
import { appSettings } from '../../app.settings';
import { LanguageEnum, MessageType } from '../../infrastructure/enums';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminRegistrationComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public submitted = false;
  public showPopup = false;
  public termsAccepted = false;
  public loading: boolean;
  public popupSaveLoader = false
  public invalidFormDisplay = false;
  public terms1Accept = false;
  public terms2Accept = false;
  private subscription = new Subscription();
  users: IUserManipulation[];
  display = false;
  isUpdate = false;
  loader = true;

  tableCols: any[] = [
    { field: 'email', header: 'Էլ․ հասցե' },
    { field: 'firstName', header: 'Անուն' },
    { field: 'lastName', header: 'Ազգանուն' },
    { field: 'typeID', header: 'Տեսակ' },
    { field: 'statusID', header: 'Կարգավիճակ'},
    { field: 'action', header: ''},
  ];

  rowsCounts = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 }
  ];

  rowsCount = this.rowsCounts[0].value;


  private userTypes: IDropdown[] = [
    { label: 'Ադմինիստրատոր', value: UserType.Admin },
    { label: 'Գլխավոր Ադմինիստրատոր', value: UserType.SuperAdmin },
    { label: 'Տվյալներ մուտքագրող', value: UserType.User }
  ];


  private accountStatuses: IDropdown[] = [
    { label: 'Էլ․ հասցեն վավերացված չէ', value: AccountStatus.EmailNotConfirmed },
    { label: 'Ակտիվ', value: AccountStatus.Active },
    { label: 'Արգելափակված', value: AccountStatus.Locked },
    { label: 'Կասեցված', value: AccountStatus.Disabled },
  ];

  private accountStatuseForEdits: IDropdown[] = [
    { label: 'Ակտիվ', value: AccountStatus.Active },
    { label: 'Կասեցված', value: AccountStatus.Disabled },
  ];

  constructor(protected router: Router,
    private fb: FormBuilder,
    private userRegisterService: UserRegisterService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService) {
  }

  ngOnInit() {
    this.initForm();
    this.usersByPageSizeAndPage(appSettings.NATURE_ITEMS_GET_COUNT, appSettings.NATURE_ITEMS_GET_PAGE);
  }

  private initForm(): void {
    if (this.isUpdate) {
      this.form = this.fb.group({
        id: [0, [RequiredValidator]],
        firstName: ['', [RequiredValidator, MaxLengthValidator.validate(200)]],
        lastName: ['', [RequiredValidator, MaxLengthValidator.validate(200)]],
        email: ['', [RequiredValidator, EmailValidator.validate, (control) => MaxLengthValidator.validate(200)]],
        typeID: [0, [RequiredValidator]],
        statusID: [0, [RequiredValidator]]
      });
    } else {
      this.form = this.fb.group({
        firstName: ['', [RequiredValidator, MaxLengthValidator.validate(200)]],
        lastName: ['', [RequiredValidator, MaxLengthValidator.validate(200)]],
        email: ['', [RequiredValidator, EmailValidator.validate, (control) => MaxLengthValidator.validate(200)]],
        typeID: [UserType.Admin, [RequiredValidator]],
        password: ['',
          [RequiredValidator, MinLengthValidator.validate(6), MaxLengthValidator.validate(20), PasswordValidator.validate]],
        confirmPassword: ['',
          [RequiredValidator, MinLengthValidator.validate(6), MaxLengthValidator.validate(20), PasswordValidator.validate]]
      }, {
          validator: PasswordsEqualValidator.validate('password', 'confirmPassword')
        });
    }
  }

  private usersByPageSizeAndPage(size: number, page: number) {
    this.userRegisterService.usersByPageSizeAndPage(size, page).subscribe((res: IResponse<IUserManipulation[]>) => {
      if (res) {
        if (res.success) {
          this.users = res.data;
          this.loader = false;
        } else {
        }
      }
    });
  }

  getUserType(userTypeId: number) {
    return this.userTypes.filter(x => x.value === userTypeId)[0].label;
  }

  getAccountStatus(statusId: number) {
    return this.accountStatuses.filter(x => x.value === statusId)[0].label;
  }

  letToEditUser(statusId: number) {
    return statusId !== AccountStatus.Locked && statusId !== AccountStatus.EmailNotConfirmed;
  }

  letToSendEmail(statusId: number) {
    return statusId === AccountStatus.EmailNotConfirmed;
  }


  changePaginationCount(event) {
    this.rowsCount = event.value;
  }

  addUser() {
    this.isUpdate = false;
    this.initForm();
    this.display = true;
  }

  clickEditItem(id: number) {
    this.userRegisterService.userForEdit(id).subscribe((res: IResponse<IUserManipulation>) => {
      if (res) {
        if (res.success) {
          this.isUpdate = true;
          this.initForm();
          this.form.patchValue(<any>res.data);
          this.display = true;
        } else {
          this.messageService.add({ severity: enumToString(MessageType, MessageType.error), life: 10000, detail: res.error.displayMessage });
        }
      }
    });
  }

  resendEmailConfirmationEmail(email: string) {
    this.userRegisterService.resendConfirmationEmail(email).subscribe((res: IResponse<void>) => {
      if (res) {
        if (res.success) {
          this.messageService.add({ severity: enumToString(MessageType, MessageType.success), life: 10000, detail: res.message });
        } else {
          this.messageService.add({ severity: enumToString(MessageType, MessageType.error), life: 10000, detail: res.error.displayMessage });
        }
      }
    });
  }

  save() {
    this.submitted = true;
    this.popupSaveLoader = true;
    if (this.form.invalid) {
      this.popupSaveLoader = false;
      this.invalidFormDisplay = true;
      return;
    }
    if (this.isUpdate) {
      if (this.form.valid) {
        const userRegister = this.userRegisterService.edit(this.form.value)
          .subscribe((res: IResponse<IUserManipulation>) => {
            if (res) {
              if (res.success) {
                this.sharedService.setData(res && res.message ? res.message : '', 'value');
                this.sharedService.setData('Successfully Registered', 'Title');
                this.sharedService.setData('Done', 'loginButtonName');
                const nature = this.users.filter(x => x.id === res.data.id)[0];
                const natureIndex = this.users.indexOf(nature);
                this.users[natureIndex] = res.data;
                this.display = false;
                this.form.reset();
                this.messageService.add({ severity: enumToString(MessageType, MessageType.success), life: 10000, detail: res.message });
                this.submitted = false;
                this.popupSaveLoader = false;
              } else {
                this.messageService.add({ severity: enumToString(MessageType, MessageType.error), life: 10000, detail: res.error.displayMessage });
                this.submitted = false;
                this.popupSaveLoader = false;
              }
            }
          },
            err => {
              this.messageService.add({ severity: enumToString(MessageType, MessageType.error), life: 10000, detail: err.error.errorMessage });
              this.submitted = false;
              this.popupSaveLoader = false;
            });
        this.subscription.add(userRegister);
      }
    } else {
      if (this.form.valid) {
        const userRegister = this.userRegisterService.register(this.form.value)
          .subscribe((res: IResponse<IUserManipulation>) => {
            if (res) {
              if (res.success) {
                this.sharedService.setData(res && res.message ? res.message : '', 'value');
                this.sharedService.setData('Successfully Registered', 'Title');
                this.sharedService.setData('Done', 'loginButtonName');
                this.users.unshift(res.data);
                this.display = false;
                this.form.reset();
                this.messageService.add({ severity: enumToString(MessageType, MessageType.success), life: 10000, detail: res.message });
                this.submitted = false;
                this.popupSaveLoader = false;
              } else {
                this.messageService.add({ severity: enumToString(MessageType, MessageType.error), life: 10000, detail: res.error.displayMessage });
                this.submitted = false;
                this.popupSaveLoader = false;
              }
            }
          },
            err => {
              this.messageService.add({ severity: enumToString(MessageType, MessageType.error), life: 10000, detail: err.error.errorMessage });
              this.submitted = false;
              this.popupSaveLoader = false;
            });
        this.subscription.add(userRegister);
      }
    }
    this.invalidFormDisplay = false;
  }

  cancel() {
    if (this.form.touched) {
      this.confirmationService.confirm({
        message: `Վստա՞հ եք, որ ցանկանում եք չեղարկել։ Ձեր կատարած փոփոխությունները չեն պահպանվելու։`,
        accept: () => {
          this.form.reset();
          this.display = false;
          this.submitted = false;
        },
        reject: () => {
          return false;
        }
      });
    } else {
      this.form.reset();
      this.display = false;
      this.submitted = false;
    }
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

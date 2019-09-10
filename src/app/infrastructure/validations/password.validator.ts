import {AbstractControl} from '@angular/forms';
import {appSettings} from '../../app.settings';
import {validatorErrorMessage} from '../utils/validator-error-message';


export class PasswordValidator {
  public static validate(c: AbstractControl): IValidatorErrorMessage {
    if (c.value) {
      return appSettings.PASSWORD_REG_EXP.test(c.value) ?
        null : validatorErrorMessage('passwordValid');
    }
    return null;
  }
}


import {AbstractControl, ValidatorFn} from '@angular/forms';
import {validatorErrorMessage} from '../utils/validator-error-message';

export class RequiredDefaultValueValidator {
  public static validate(value: string): ValidatorFn {
    return (c: AbstractControl): IValidatorErrorMessage => {
      return value === c.value.toString() ? validatorErrorMessage('requiredValid') : null;
    };
  }
}

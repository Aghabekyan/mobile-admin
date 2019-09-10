import {AbstractControl, ValidatorFn} from '@angular/forms';

export class MinLengthValidator {
  public static validate(length: number): ValidatorFn {
    return (c: AbstractControl) => {
      if (c.value && c.value.toString().trim()) {
        return (c.value.length < length) ?
          {
            minLength: {
              valid: false
            }
          } : null;
      }
      return null;
    };
  }
}

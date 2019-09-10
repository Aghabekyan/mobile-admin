import {AbstractControl, ValidatorFn} from '@angular/forms';

export class MaxLengthValidator {
  public static validate(length: number): ValidatorFn {
    return (c: AbstractControl) => {
      if (c.value && c.value.toString().trim()) {
        return (c.value.length > length) ?
          {
            maxLength: {
              valid: false
            }
          } : null;
      }
      return null;
    };
  }
}

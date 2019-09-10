import {AbstractControl} from '@angular/forms';

export class EmailValidator {
  public static validate(c: AbstractControl) {
    const REGEXP = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (c.value && c.value.trim()) {
      return !REGEXP.test(c.value) ? {
        validateEmail: {
          valid: false
        }
      } : null;
    }
    return null;
  }
}

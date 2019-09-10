import {FormGroup, ValidatorFn} from '@angular/forms';


export class PasswordsEqualValidator {
  public static validate(firstField: string, secondField: string): ValidatorFn {
    return (c: FormGroup) => {
      const pass1 = c.get(firstField) && c.get(firstField).value;
      const pass2 = c.get(secondField) && c.get(secondField).value;
      if (pass1 && pass2) {
        return pass1 === pass2 ?
          null : {
            passwordsEqual: {
              valid: false
            }
          };
      }
      return null;
    };
  }
}

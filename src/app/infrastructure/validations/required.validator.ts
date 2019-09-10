import {AbstractControl, ValidatorFn} from '@angular/forms';

function isEmpty(value): boolean {
  return value === undefined || value === null ||
    (typeof value === 'string' && value.trim().length === 0) || (Array.isArray(value) && value.length === 0);
}

export function RequiredValidator(control: AbstractControl): {[key: string]: any} | null {
    return isEmpty(control.value) ? {'required': true} : null;
}

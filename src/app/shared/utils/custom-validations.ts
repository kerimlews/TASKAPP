import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isUpperCase } from './helpers';

export function forbiddenUppercase(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
        control.value?.split('').some((v: string) => v === v.toUpperCase())
            ? { forbiddenUppercase: 'Forbidden Uppercase' }
            : null;
}

export function firstLetterUppercase(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
        !isUpperCase((control.value as string).charAt(0))
            ? { firstLetterUppercase: 'First letter must be capitalized !' }
            : null;
}

export function leadingOrTrailingWhitespace(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
        !/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/.test(control.value)
            ? { leadingOrTrailingWhitespace: 'Forbidden leading or trailing whitespaces' }
            : null;
}

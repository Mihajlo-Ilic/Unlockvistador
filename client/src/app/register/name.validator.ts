import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function firstNameValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null  => {
        const firstNameIsCorrect =
         control.value.filter(np => np !== '').length === 1 ;
            return firstNameIsCorrect ? null : {incorrectName: true};
    };
};

export function lastNameValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null  => {
        const lastNameIsCorrect =
         control.value.split(' ').filter(np => np !== '').length >= 1;
            return lastNameIsCorrect ? null : {incorrectName: true};
    };
}
import { Component, inject, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationMessage } from '@/app/shared/components/invalid-field/validation-message';

@Component({
    selector: 'app-invalid-field',
    imports: [],
    templateUrl: './invalid-field.html',
    styleUrl: './invalid-field.scss'
})
export class InvalidField {
    readonly control = input.required<AbstractControl | null>();

    private readonly validationMessageService = inject(ValidationMessage);

    get errorMessage(): string | null {
        const control = this.control();
        if (!control || control.valid || control.disabled || !control.touched) {
            return null;
        }
        const errors = this.validationMessageService.getMessages(control.errors);
        return errors[0] ?? null;
    }
}

import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValid } from 'date-fns';

@Injectable({
    providedIn: 'root'
})
export class CustomValidator {
    static cnpjFormatValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) {
            return null;
        }
        return /^([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/.test(String(value))
            ? null
            : { invalidCnpjField: true };
    }
    static cep(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) {
            return null;
        }
        return /^([\d]{2}.?[\d]{3}-?[\d]{3})$/.test(String(value)) ? null : { invalidCepField: true };
    }
    static uf(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) {
            return null;
        }
        const ufs = [
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MS',
            'MT',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RJ',
            'RN',
            'RS',
            'RO',
            'RR',
            'SC',
            'SP',
            'SE',
            'TO'
        ];
        return ufs.includes(String(value).toUpperCase()) ? null : { invalidUfField: true };
    }
    static telefoneValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) {
            return null;
        }
        return /^([0-9]{2}[0-9]{5}[0-9]{4})|([0-9]{2}[0-9]{4}[0-9]{4})$/.test(String(value))
            ? null
            : { invalidTelefoneField: true };
    }
    static dateFieldValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) {
            return null;
        }
        return isValid(value) ? null : { invalidDateField: true };
    }
    static minValor(value: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const currentValue = control.value;
            if (currentValue === null || currentValue === undefined || currentValue === '') {
                return null;
            }
            return currentValue < value ? { minValor: { actual: currentValue, min: value } } : null;
        };
    }
    static maxValor(value: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const currentValue = control.value;
            if (currentValue === null || currentValue === undefined || currentValue === '') {
                return null;
            }
            return currentValue > value ? { maxValor: { actual: currentValue, max: value } } : null;
        };
    }
    static byRegex(regex: RegExp): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) {
                return null;
            }
            return regex.test(String(value)) ? { byRegex: true } : null;
        };
    }
    static validatePasswords(controlNames: string[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const values = controlNames.map((name) => control.get(name)?.value);
            const equals = values.every((value) => value === values[0]);
            return equals ? null : { invalidPasswords: true };
        };
    }
    static CPF(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) {
                return null;
            }
            const cpf = String(value).replace(/\D/g, '');
            return this.isValidCpf(cpf) ? null : { invalidCpfField: true };
        };
    }
    private static isValidCpf(cpf: string): boolean {
        if (cpf.length !== 11) {
            return false;
        }
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += Number(cpf[i]) * (10 - i);
        }
        let remainder = (sum * 10) % 11;
        if (remainder === 10) {
            remainder = 0;
        }
        if (remainder !== Number(cpf[9])) {
            return false;
        }
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += Number(cpf[i]) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10) {
            remainder = 0;
        }
        return remainder === Number(cpf[10]);
    }
}

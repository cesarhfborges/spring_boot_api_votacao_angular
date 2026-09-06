import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

type IValidationMessage = string | ((error: unknown) => string);

@Injectable({
    providedIn: 'root'
})
export class ValidationMessage {
    private readonly messages: Record<string, IValidationMessage> = {
        required: 'Campo Obrigatório.',
        min: (error: any) => `O mínimo para o campo é ${error?.min ?? 0}.`,
        max: (error: any) => `O máximo para o campo é ${error?.max ?? 0}.`,
        minlength: (error: any) => `Tamanho mínimo ${error?.requiredLength ?? 0} caracteres.`,
        maxlength: (error: any) => `O Tamanho máximo para o campo é ${error?.requiredLength ?? 0} caracteres.`,
        invalidNumberField: 'Somente números são aceitos.',
        invalidPlacaField: 'A Placa informada é inválida.',
        invalidCepField: 'O CEP informado é inválido.',
        invalidDateField: 'Data inserida é inválida.',
        invalidTelefoneField: 'Numero de telefone inválido.',
        invalidCreditCard: 'Número de cartão de crédito inválido.',
        email: 'Endereço de email inválido.',
        invalidPassword: 'Senha inválida. A senha deve ter pelo menos 6 caracteres e conter um número.',
        invalidPasswords: 'As senhas informadas não conferem.',
        invalidCnpjField: 'CNPJ Informado é invalido.',
        invalidCpfField: 'CPF Informado é invalido.',
        avisarMenorQueRodagem: 'O item avisar deve ser menor que a rodagem.',
        invalidUfField: 'A uf informada é inválida.',
        invalidTipoEnderecoField: 'O Tipo de endereço informado é inválido.',
        dateRangeInvalid: 'Intervalo de datas informado é inválido.',
        minDiff15Minutes: 'O Evento precisa ter no minimo 15 minutos de duração.',
        minYears: (error: any) => `A data informada precisa ser anterior à ${error?.min}.`,
        hasDuplicates: (error: any) => `Existem itens duplicados para ${error?.control}.`
    };
    getMessage(validatorName: string, validatorValue?: unknown): string {
        const message = this.messages[validatorName];
        if (!message) {
            return this.getFallback(validatorName, validatorValue);
        }
        return typeof message === 'function' ? message(validatorValue) : message;
    }
    getMessages(errors: ValidationErrors | null): string[] {
        if (!errors) {
            return [];
        }
        return Object.entries(errors).map(([validatorName, validatorValue]) =>
            this.getMessage(validatorName, validatorValue)
        );
    }
    private getFallback(validatorName: string, validatorValue?: unknown): string {
        if (
            typeof validatorValue === 'object' &&
            validatorValue !== null &&
            'message' in validatorValue &&
            typeof validatorValue.message === 'string'
        ) {
            return validatorValue.message;
        }
        return validatorName;
    }
}

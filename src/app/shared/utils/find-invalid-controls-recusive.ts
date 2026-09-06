import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export interface FormError {
    path: string;
    errors: string[];
}

export function findInvalidControlsRecursive(control: AbstractControl, parentPath = ''): FormError[] {
    if (control.valid) {
        return [];
    }

    const results: FormError[] = [];

    // Captura erros no nível do próprio controle/grupo
    if (control.errors) {
        results.push({
            path: parentPath || 'root',
            errors: Object.keys(control.errors)
        });
    }

    // Tratamento recursivo para FormGroup e FormArray
    if (control instanceof FormGroup || control instanceof FormArray) {
        const controls = control.controls as Record<string, AbstractControl> | AbstractControl[];

        for (const [key, childControl] of Object.entries(controls)) {
            const currentPath = parentPath
                ? control instanceof FormArray
                    ? `${parentPath}[${key}]`
                    : `${parentPath}.${key}`
                : key;

            results.push(...findInvalidControlsRecursive(childControl, currentPath));
        }
    }

    return results;
}

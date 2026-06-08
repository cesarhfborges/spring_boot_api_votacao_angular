import { Component, inject, input, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumber } from 'primeng/inputnumber';
import { RadioButton } from 'primeng/radiobutton';
import { PautaService } from '@/app/core/services/pauta-service';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-pauta-editar',
    imports: [Button, ReactiveFormsModule, InputText, Textarea, InputNumber, RadioButton],
    templateUrl: './pauta-editar.html',
    styleUrl: './pauta-editar.scss'
})
export class PautaEditar implements OnInit {
    readonly reuniaoId = input.required<number>();

    public form: FormGroup;

    protected readonly tipoVotos = [
        { label: 'Único', value: 'UNICO' },
        { label: 'Multiplo', value: 'MULTIPLO' }
    ];

    private readonly fb = inject(NonNullableFormBuilder);
    private readonly dialogRef = inject(DynamicDialogRef);
    private readonly dialogConfig = inject(DynamicDialogConfig);
    private readonly pautaService = inject(PautaService);

    constructor() {
        this.form = this.fb.group({
            titulo: ['', [Validators.required]],
            descricao: ['', [Validators.required]],
            tipoVoto: ['', [Validators.required]]
        });

        this.form.get('tipoVoto')?.valueChanges.subscribe({
            next: (value) => {
                if (value === 'UNICO') {
                    this.form.removeControl('limiteSelecoes');
                } else {
                    this.form.addControl('limiteSelecoes', new FormControl(1, [Validators.required]));
                }
            }
        });
    }

    ngOnInit(): void {
        console.log('PautaEditar', this.dialogConfig.data);
        if (this.dialogConfig.data.pauta) {
            this.form.patchValue(this.dialogConfig.data.pauta);
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    protected async onSubmit(): Promise<void> {
        try {
            this.form.markAllAsTouched();
            this.form.markAllAsDirty();
            if (this.form.invalid) {
                return;
            }

            let res;

            if (this.dialogConfig.data.pauta.id) {
                res = await lastValueFrom(
                    this.pautaService.update(this.reuniaoId(), this.dialogConfig.data.pauta.id, this.form.value)
                );
            } else {
                res = await lastValueFrom(this.pautaService.create(this.reuniaoId(), this.form.value));
            }

            this.dialogRef.close(res);
        } catch (e) {
            console.error(e);
        }
    }
}

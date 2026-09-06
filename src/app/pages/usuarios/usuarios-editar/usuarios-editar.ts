import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuncionariosService } from '@/app/core/services/funcionarios-service';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { format, parse, subYears } from 'date-fns';
import { InputMaskModule } from 'primeng/inputmask';
import { JsonPipe } from '@angular/common';
import { InvalidField } from '@/app/shared/components/invalid-field/invalid-field';
import { findInvalidControlsRecursive } from '@/app/shared/utils/find-invalid-controls-recusive';
import { CustomValidator } from '@/app/shared/components/invalid-field/custom-validator';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-usuarios-editar',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        TableModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        SelectModule,
        DatePickerModule,
        FluidModule,
        InputMaskModule,
        JsonPipe,
        InvalidField
    ],
    templateUrl: './usuarios-editar.html',
    styleUrl: './usuarios-editar.scss'
})
export class UsuariosEditar implements OnInit {
    id: number | null = null;

    loading = signal<Record<string, boolean>>({
        usuario: false
    });

    form: FormGroup;

    config = {
        date: {
            min: subYears(new Date(), 18)
        }
    };

    private readonly fb = inject(NonNullableFormBuilder);
    private readonly route = inject(ActivatedRoute);
    private readonly messageService = inject(MessageService);
    private readonly funcionariosService = inject(FuncionariosService);

    constructor() {
        this.form = this.fb.group({
            nome: ['', [Validators.required, Validators.minLength(3)]],
            sobrenome: ['', Validators.required],
            dataNascimento: ['', []], // Armazena a data como string ou nulo
            cpf: ['', [CustomValidator.CPF()]], // Valida 11 dígitos numéricos
            rg: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        this.id = idParam && !isNaN(Number(idParam)) ? Number(idParam) : null;
        if (this.id) {
            this.getUsuario(this.id);
        }
    }

    getUsuario(value: number): void {
        this.loading.update((estados) => ({ ...estados, usuarios: true }));
        this.funcionariosService.get(value).subscribe({
            next: (data) => {
                console.log(data);
                this.form.patchValue({
                    ...data,
                    dataNascimento: data.dataNascimento
                        ? parse(data.dataNascimento as any, 'yyyy-MM-dd', new Date())
                        : ''
                });
                this.loading.update((estados) => ({ ...estados, usuarios: false }));
            }
        });
    }

    onSubmit(): void {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Atenção',
                detail: 'Verifique os campos'
            });
            return;
        }
        const value = this.form.value;
        const req = {
            ...value,
            dataNascimento: value.dataNascimento ? format(value.dataNascimento, 'yyyy-MM-dd') : ''
        };
        if (this.id !== null) {
            void this.atualizar(this.id, req);
        } else {
            void this.cadastrar(req);
        }
    }

    async cadastrar(value: any): Promise<void> {
        console.log('cadastrar: ->>>>');
        const res = await lastValueFrom(this.funcionariosService.create(value));
        console.log('cadastrar: ', res);
    }

    async atualizar(id: number, value: any): Promise<void> {
        console.log('atualizar: ->>>>');
        const res = await lastValueFrom(this.funcionariosService.update(id, value));
        console.log('atualizar: ', res);
    }

    protected invalidos() {
        return findInvalidControlsRecursive(this.form);
    }
}

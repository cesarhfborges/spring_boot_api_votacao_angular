import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { FuncionariosService } from '@/app/core/services/funcionarios-service';
import { Funcionario } from '@/app/core/models/Funcionario';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-nao-votante-editar',
    imports: [Button, InputText, ReactiveFormsModule, Select, TitleCasePipe],
    templateUrl: './nao-votante-editar.html',
    styleUrl: './nao-votante-editar.scss'
})
export class NaoVotanteEditar implements OnInit {
    readonly reuniaoId = input.required<number>();
    readonly pautaId = input.required<number>();
    readonly selecionados = input.required<number[]>();

    public form: FormGroup;
    protected usuarios = signal<Funcionario[]>([]);

    private fb = inject(NonNullableFormBuilder);
    private dialogRef = inject(DynamicDialogRef);
    private dialogConfig = inject(DynamicDialogConfig);
    private funcionariosService = inject(FuncionariosService);

    constructor() {
        this.form = this.fb.group({
            usuario: [null, [Validators.required]],
            motivo: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.funcionariosService.listar({ sort: 'id', direction: 'ASC' }).subscribe({
            next: (data) => {
                console.log('NaoVotanteEditar: ', data);
                this.usuarios.set(data.filter((i) => !this.selecionados().includes(i.id)));
            }
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    async submit(): Promise<void> {
        try {
            // console.log('submit', this.form.value);
            // this.form.markAllAsTouched();
            // this.form.markAllAsDirty();
            // if (this.form.invalid) {
            //     return;
            // }
            //
            // let res = undefined;
            //
            // if (this.dialogConfig.data?.opcao?.id) {
            //     res = await lastValueFrom(this.opcaoVotoService.update(this.reuniaoId(), this.pautaId(), this.dialogConfig.data.opcao.id, this.form.value));
            // } else {
            //     res = await lastValueFrom(this.opcaoVotoService.create(this.reuniaoId(), this.pautaId(), this.form.value));
            // }
            // this.dialogRef.close(res);
        } catch (error) {
            console.log(error);
        }
    }
}

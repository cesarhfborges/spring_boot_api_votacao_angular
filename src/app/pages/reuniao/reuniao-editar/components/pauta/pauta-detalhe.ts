import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Pauta } from '@/app/core/models/pauta';
import { Card } from 'primeng/card';
import { PautaService } from '@/app/core/services/pauta-service';
import { firstValueFrom } from 'rxjs';
import { PautaCard } from '@/app/pages/reuniao/reuniao-editar/components/pauta-card/pauta-card';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PautaEditar } from '@/app/pages/reuniao/reuniao-editar/components/pauta-editar/pauta-editar';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-pauta-detalhe',
    imports: [Button, Card, PautaCard],
    templateUrl: './pauta-detalhe.html',
    styleUrl: './pauta-detalhe.scss'
})
export class PautaDetalhe implements OnInit {
    readonly reuniaoId = input.required<number>();

    readonly pautaSelecionada = input<Pauta | null>(null);

    readonly onSelecionarPauta = output<Pauta>();

    protected pautas = signal<Pauta[]>([]);

    protected loading = signal<boolean>(false);

    private readonly pautaService = inject(PautaService);
    private readonly dialogService = inject(DialogService);
    private readonly messageService = inject(MessageService);

    ngOnInit(): void {
        void this.carregarPautas();
    }

    protected selecionarPauta(pauta: Pauta): void {
        this.onSelecionarPauta.emit(pauta);
    }

    protected editarPauta(pauta?: Pauta): void {
        const config: DynamicDialogConfig = {
            header: pauta ? 'Editar' : 'Cadastrar',
            width: '50vw',
            modal: true,
            focusTrap: true,
            dismissableMask: false,
            draggable: false,
            closable: true,
            position: 'center',
            appendTo: 'body',
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            inputValues: {
                reuniaoId: this.reuniaoId()
            }
        };

        if (pauta) {
            config.data = {
                pauta: pauta
            };
        }

        const ref = this.dialogService.open(PautaEditar, config);

        ref?.onClose.subscribe({
            next: (result: Pauta | undefined) => {
                console.log('onClose', result);
                if (!result) {
                    return;
                }
                this.loading.set(true);
                if (pauta) {
                    this.pautas.update((lista) => {
                        return lista.map((item) => (item.id === result.id ? result : item));
                    });
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Opção atualizada com sucesso.'
                    });
                } else {
                    this.pautas.update((lista) => [...lista, result]);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Opção cadastrada com sucesso.'
                    });
                }
                this.loading.set(false);
            }
        });
    }

    protected async excluirPauta(id: number): Promise<void> {
        console.log('excluir pauta', id);

        // await firstValueFrom(this.pautaService.excluir(id));
        // await this.carregarPautas();
    }

    private async carregarPautas(): Promise<void> {
        this.loading.set(true);
        const pautas = await firstValueFrom(this.pautaService.listar(this.reuniaoId()));
        this.pautas.set(pautas);
        this.loading.set(false);
    }
}

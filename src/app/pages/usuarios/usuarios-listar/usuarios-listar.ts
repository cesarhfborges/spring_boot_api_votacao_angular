import { Component, inject, OnInit, signal } from '@angular/core';
import { FuncionariosService } from '@/app/core/services/funcionarios-service';
import { Funcionario } from '@/app/core/models/Funcionario';
import { TableModule } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-usuarios-listar',
    imports: [TableModule, ButtonModule, RouterLink, CardModule],
    templateUrl: './usuarios-listar.html',
    styleUrl: './usuarios-listar.scss'
})
export class UsuariosListar implements OnInit {
    protected lista = signal<Funcionario[]>([]);

    protected tableConfig: any = {
        dataKey: 'id',
        filter: {
            fields: ['id', 'nome', 'sobrenome', 'dataNascimento']
        }
    };

    protected loading = {
        lista: false
    };

    protected menuItems: MenuItem[] = [
        {
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: () => {
                // if (this.reuniaoSelecionada) this.update(this.reuniaoSelecionada);
            }
        },
        { separator: true },
        {
            label: 'Excluir',
            icon: 'pi pi-trash',
            command: () => {
                // if (this.reuniaoSelecionada) this.delete(this.reuniaoSelecionada);
            }
        }
    ];

    private readonly funcionariosService = inject(FuncionariosService);

    ngOnInit(): void {
        this.carregarUsuarios();
    }

    carregarUsuarios(): void {
        this.loading.lista = false;
        this.funcionariosService.listar().subscribe({
            next: (value) => {
                console.log(value);
                this.lista.set(value);
                this.loading.lista = false;
            }
        });
    }

    entrar(reuniao: any) {
        // this.messageService.add({
        //     severity: 'info',
        //     summary: 'Entrar',
        //     detail: `Entrando ${reuniao.titulo} na reunião`
        // });
        // void this.router.navigate(['/reuniao', reuniao.id]);
    }

    protected definirItemAtivo(item: any): void {
        // this.reuniaoSelecionada = item;
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LayoutService } from '@/app/shared/layout/service/layout.service';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastModule, ConfirmDialogModule],
    template: `
        <p-toast></p-toast>
        <p-confirmDialog />
        <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
    private readonly layoutService = inject(LayoutService);
    private readonly primengConfig = inject(PrimeNG);

    ngOnInit(): void {
        this.initializeTheme();
        // this.primengConfig.setConfig({})
        this.primengConfig.setTranslation({
            firstDayOfWeek: 0,
            dayNames: [
                'Domingo',
                'Segunda-feira',
                'Terça-feira',
                'Quarta-feira',
                'Quinta-feira',
                'Sexta-feira',
                'Sábado'
            ],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            monthNames: [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
            ],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'Hoje',
            clear: 'Limpar',
            dateFormat: 'dd/mm/yy'
        });
    }

    private initializeTheme(): void {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        this.layoutService.layoutConfig.update((config) => ({
            ...config,
            darkTheme: mediaQuery.matches
        }));

        mediaQuery.addEventListener('change', (event) => {
            this.layoutService.layoutConfig.update((config) => ({
                ...config,
                darkTheme: event.matches
            }));
        });
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LayoutService } from '@/app/shared/layout/service/layout.service';

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

    ngOnInit(): void {
        this.initializeTheme();
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

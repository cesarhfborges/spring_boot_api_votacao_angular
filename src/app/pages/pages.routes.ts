import { Routes } from '@angular/router';
import { Dashboard } from '@/app/pages/dashboard/dashboard';
import { UsuariosEditar, UsuariosListar } from '@/app/pages/usuarios';
import { ReuniaoEditar, ReuniaoListar } from '@/app/pages/reuniao';

export default [
    { path: 'home', component: Dashboard },
    {
        path: 'cadastro',
        children: [
            {
                path: 'reuniao',
                children: [
                    { path: '', component: ReuniaoListar },
                    { path: ':id', component: ReuniaoEditar }
                ]
            },
            {
                path: 'usuarios',
                children: [
                    { path: '', component: UsuariosListar },
                    { path: ':id', component: UsuariosEditar }
                ]
            }
        ]
    }
    // { path: 'perfil', component: Perfil },
    // { path: 'usuarios', component: UsuariosListar },
    // { path: 'usuarios/:id', component: UsuariosEditar }
] as Routes;

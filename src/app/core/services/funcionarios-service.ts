import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';
import { Funcionario } from '@/app/core/models/Funcionario';
import { buildHttpParams, HttpOptions } from '@/app/core/utils/http.utils';

@Injectable({
    providedIn: 'root'
})
export class FuncionariosService {
    private readonly http = inject(HttpClient);

    public listar(options?: HttpOptions): Observable<Funcionario[]> {
        const params = buildHttpParams(options);
        return this.http.get<Funcionario[]>(`${environment.apiUrl}/funcionarios`, { params });
    }

    public get(value: number, options?: HttpOptions): Observable<Funcionario> {
        const params = buildHttpParams(options);
        return this.http.get<Funcionario>(`${environment.apiUrl}/funcionarios/${value}`, { params });
    }

    public create(value: any, options?: HttpOptions): Observable<Funcionario> {
        const params = buildHttpParams(options);
        return this.http.post<Funcionario>(`${environment.apiUrl}/funcionarios`, value, { params });
    }

    public update(id: number, value: any, options?: HttpOptions): Observable<Funcionario> {
        const params = buildHttpParams(options);
        return this.http.put<Funcionario>(`${environment.apiUrl}/funcionarios/${id}`, value, { params });
    }
}

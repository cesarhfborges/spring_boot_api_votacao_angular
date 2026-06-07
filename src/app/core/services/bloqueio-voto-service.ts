import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Observable } from 'rxjs';
import { BloqueioVoto } from '@/app/core/models/bloqueio-voto';
import { buildHttpParams, HttpOptions } from '@/app/core/utils/http.utils';

@Injectable({
    providedIn: 'root'
})
export class BloqueioVotoService {
    private readonly http = inject(HttpClient);

    public listar(reuniaoId: number, pautaId: number, options?: HttpOptions): Observable<BloqueioVoto[]> {
        const params = buildHttpParams(options);
        return this.http.get<BloqueioVoto[]>(`${environment.apiUrl}/reunioes/${reuniaoId}/pautas/${pautaId}/bloqueios-voto`, { params });
    }

    public get(reuniaoId: number, id: number): Observable<BloqueioVoto> {
        return this.http.get<BloqueioVoto>(`${environment.apiUrl}/reunioes/${reuniaoId}/pautas${id}`);
    }
}

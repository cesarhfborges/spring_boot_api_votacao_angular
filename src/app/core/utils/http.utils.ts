import { HttpParams } from '@angular/common/http';

export type HttpOptions = Record<string, string | number | boolean | undefined | null>;

export function buildHttpParams(options?: HttpOptions): HttpParams {
    let params = new HttpParams();

    if (options) {
        Object.entries(options).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params = params.set(key, value.toString());
            }
        });
    }

    return params;
}

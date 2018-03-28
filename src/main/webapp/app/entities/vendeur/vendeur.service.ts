import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Vendeur } from './vendeur.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Vendeur>;

@Injectable()
export class VendeurService {

    private resourceUrl =  SERVER_API_URL + 'api/vendeurs';

    constructor(private http: HttpClient) { }

    create(vendeur: Vendeur): Observable<EntityResponseType> {
        const copy = this.convert(vendeur);
        return this.http.post<Vendeur>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vendeur: Vendeur): Observable<EntityResponseType> {
        const copy = this.convert(vendeur);
        return this.http.put<Vendeur>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Vendeur>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Vendeur[]>> {
        const options = createRequestOption(req);
        return this.http.get<Vendeur[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Vendeur[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Vendeur = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Vendeur[]>): HttpResponse<Vendeur[]> {
        const jsonResponse: Vendeur[] = res.body;
        const body: Vendeur[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Vendeur.
     */
    private convertItemFromServer(vendeur: Vendeur): Vendeur {
        const copy: Vendeur = Object.assign({}, vendeur);
        return copy;
    }

    /**
     * Convert a Vendeur to a JSON which can be sent to the server.
     */
    private convert(vendeur: Vendeur): Vendeur {
        const copy: Vendeur = Object.assign({}, vendeur);
        return copy;
    }
}

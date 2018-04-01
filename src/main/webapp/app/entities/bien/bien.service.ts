import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Bien } from './bien.model';
import { createRequestOption } from '../../shared';
import {Visite} from '../../biens-avendre/visite.model';
import {Client} from '../client/client.model';

export type EntityResponseType = HttpResponse<Bien>;

@Injectable()
export class BienService {

    private resourceUrl =  SERVER_API_URL + 'api/biens';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    //ajout de la méthode ajouter client à une visite
    ajoutClientVisite(idVisite: number, idClient: number): Observable<EntityResponseType> {
      //  const copyV = this.convert(idVisite);
       // const copyB = this.convert(idClient);
        return this.http.post<Visite>(`http://localhost:8080/api/visites/client`, {idVisite,idClient}, { observe: 'response' })
        .map((res: EntityResponseType) => this.convertResponse(res));
    }

    // ajout méthode qui retourne du client par login
    findIdClient(login:any): Observable<EntityResponseType>  {
        return this.http.get<Client>(`http://localhost:8080/api/clientLogin/${login}`, {observe: 'response' })
        .map((res: EntityResponseType) => this.convertResponse(res));
    }


    create(bien: Bien): Observable<EntityResponseType> {
        const copy = this.convert(bien);
        return this.http.post<Bien>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }


    update(bien: Bien): Observable<EntityResponseType> {
        const copy = this.convert(bien);
        return this.http.put<Bien>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Bien>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Bien[]>> {
        const options = createRequestOption(req);
        return this.http.get<Bien[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Bien[]>) => this.convertArrayResponse(res));
    }

    queryAvendre(req?: any): Observable<HttpResponse<Bien[]>> {
        const options = createRequestOption(req);
        return this.http.get<Bien[]>(`http://localhost:8080/api/biensAvendre`, { params: options, observe: 'response' })
        .map((res: HttpResponse<Bien[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Bien = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Bien[]>): HttpResponse<Bien[]> {
        const jsonResponse: Bien[] = res.body;
        const body: Bien[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }
    private convertArrayResponseClient(res: HttpResponse<Client[]>): HttpResponse<Client[]> {
        const jsonResponse: Client[] = res.body;
        const body: Client[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Bien.
     */
    private convertItemFromServer(bien: Bien): Bien {
        const copy: Bien = Object.assign({}, bien);
        copy.anneeConstruction = this.dateUtils
            .convertLocalDateFromServer(bien.anneeConstruction);
        return copy;
    }

    /**
     * Convert a Bien to a JSON which can be sent to the server.
     */
    private convert(bien: Bien): Bien {
        const copy: Bien = Object.assign({}, bien);
        copy.anneeConstruction = this.dateUtils
            .convertLocalDateToServer(bien.anneeConstruction);
        return copy;
    }
}

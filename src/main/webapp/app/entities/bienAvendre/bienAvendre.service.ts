import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BienAvendre } from './BienAvendre.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BienAvendre>;

@Injectable()
export class BienAvendreService {

    private resourceUrl =  SERVER_API_URL + 'api/biens';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }



    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BienAvendre>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BienAvendre[]>> {
        const options = createRequestOption(req);
        return this.http.get<BienAvendre[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BienAvendre[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BienAvendre = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BienAvendre[]>): HttpResponse<BienAvendre[]> {
        const jsonResponse: BienAvendre[] = res.body;
        const body: BienAvendre[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BienAvendre.
     */
    private convertItemFromServer(BienAvendre: BienAvendre): BienAvendre {
        const copy: BienAvendre = Object.assign({}, BienAvendre);
        copy.anneeConstruction = this.dateUtils
            .convertLocalDateFromServer(BienAvendre.anneeConstruction);
        return copy;
    }

    /**
     * Convert a BienAvendre to a JSON which can be sent to the server.
     */
    private convert(BienAvendre: BienAvendre): BienAvendre {
        const copy: BienAvendre = Object.assign({}, BienAvendre);
        copy.anneeConstruction = this.dateUtils
            .convertLocalDateToServer(BienAvendre.anneeConstruction);
        return copy;
    }
}

import { Injectable } from '@angular/core';
import {SERVER_API_URL} from "../app.constants";
import {JhiDateUtils} from "ng-jhipster";
import {Bien} from "../entities/bien/bien.model";
import {createRequestOption} from "../shared/model/request-util";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BiensAvendreService {

    private resourceUrl =  SERVER_API_URL + 'api/biens';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    query(req?: any): Observable<HttpResponse<Bien[]>> {
        const options = createRequestOption(req);
        return this.http.get<Bien[]>(`http://localhost:8080/api/biensAvendre`, { params: options, observe: 'response' })
        .map((res: HttpResponse<Bien[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Bien[]>): HttpResponse<Bien[]> {
        const jsonResponse: Bien[] = res.body;
        const body: Bien[] = [];
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

}

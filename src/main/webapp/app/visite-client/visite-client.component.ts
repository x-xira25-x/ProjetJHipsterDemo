import { Component, OnInit } from '@angular/core';
import {Visite} from "../entities/visite/visite.model";
import {VisiteService} from "../entities/visite/visite.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {JhiAlertService} from "ng-jhipster";

@Component({
  selector: 'jhi-visite-client',
  templateUrl: './visite-client.component.html',
  styles: []
})
export class VisiteClientComponent implements OnInit {
    visites: Visite[];
  constructor(
      private visiteService: VisiteService,
      private jhiAlertService: JhiAlertService
  ) { }

    loadAll() {
        this.visiteService.query().subscribe(
            (res: HttpResponse<Visite[]>) => {
                this.visites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
      //  this.principal.identity().then((account) => {
           // this.currentAccount = account;
       // });
       // this.registerChangeInVisites();
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}

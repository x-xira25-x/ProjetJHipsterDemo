import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Bien} from "../entities/bien/bien.model";
import {BienService} from "../entities/bien/bien.service";
import {JhiAlertService} from "ng-jhipster";
import {BiensAvendreService} from "./biens-avendre.service";


@Component({
  selector: 'jhi-biens-avendre',
  templateUrl: './biens-avendre.component.html',
  styles: []
})
export class BiensAvendreComponent implements OnInit {
    biens: Bien[];
  constructor(
      private bienService: BienService,
     // private bienAvendreService: BiensAvendreService,
      private jhiAlertService: JhiAlertService) {

  }

    loadAll() {
        this.bienService.queryAvendre().subscribe(
            (res: HttpResponse<Bien[]>) => {
                this.biens = res.body;

            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

  ngOnInit() {
      this.loadAll();
  }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }


}

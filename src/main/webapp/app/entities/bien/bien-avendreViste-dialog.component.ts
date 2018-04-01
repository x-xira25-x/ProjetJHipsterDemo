import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import {Vendeur} from "../vendeur/vendeur.model";
import {Bien} from "./bien.model";
import {Client} from "../client/client.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VisiteService} from "../visite/visite.service";
import {VendeurService} from "../vendeur/vendeur.service";
import {BienService} from "./bien.service";
import {ClientService} from "../client/client.service";
import {BienVisitePopupService} from "../../biens-avendre/bienVisite-popup.service";
import {Visite} from "../../biens-avendre/visite.model";





@Component({
    selector: 'jhi-Bienvisite-dialog',
    templateUrl: './bien-avendreViste-dialog.component.html'
})
export class BienVisteDialogComponent implements OnInit {

    visite: Visite;
    isSaving: boolean;

    vendeurs: Vendeur[];

    biens: Bien[];

    clients: Client[];
    dateDebutDp: any;
    dateFinDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private visiteService: VisiteService,
        private vendeurService: VendeurService,
        private bienService: BienService,
        private clientService: ClientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.vendeurService.query()
            .subscribe((res: HttpResponse<Vendeur[]>) => { this.vendeurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.bienService.query()
            .subscribe((res: HttpResponse<Bien[]>) => { this.biens = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.visite.id !== undefined) {
            this.subscribeToSaveResponse(
                this.visiteService.update(this.visite));
        } else {
            this.subscribeToSaveResponse(
                this.visiteService.create(this.visite));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Visite>>) {
        result.subscribe((res: HttpResponse<Visite>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Visite) {
        this.eventManager.broadcast({ name: 'visiteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVendeurById(index: number, item: Vendeur) {
        return item.id;
    }

    trackBienById(index: number, item: Bien) {
        return item.id;
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-Bienvisite-popup',
    template: ''
})
export class BienVistePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private visitePopupService: BienVisitePopupService
    ) {}

    ngOnInit() {
        console.log('bienvisitepopcompo');
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                console.log('bienvisitepopcompo');
                this.visitePopupService
                    .open(BienVisteDialogComponent  as Component, params['id']);
            } else {
                this.visitePopupService
                    .open(BienVisteDialogComponent  as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

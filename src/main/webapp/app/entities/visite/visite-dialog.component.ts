import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Visite } from './visite.model';
import { VisitePopupService } from './visite-popup.service';
import { VisiteService } from './visite.service';
import { Vendeur, VendeurService } from '../vendeur';
import { Bien, BienService } from '../bien';
import { Client, ClientService } from '../client';

@Component({
    selector: 'jhi-visite-dialog',
    templateUrl: './visite-dialog.component.html'
})
export class VisiteDialogComponent implements OnInit {

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
    selector: 'jhi-visite-popup',
    template: ''
})
export class VisitePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private visitePopupService: VisitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.visitePopupService
                    .open(VisiteDialogComponent as Component, params['id']);
            } else {
                this.visitePopupService
                    .open(VisiteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

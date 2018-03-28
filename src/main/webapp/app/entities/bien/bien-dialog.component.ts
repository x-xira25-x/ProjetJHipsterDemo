import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bien } from './bien.model';
import { BienPopupService } from './bien-popup.service';
import { BienService } from './bien.service';
import { Client, ClientService } from '../client';

@Component({
    selector: 'jhi-bien-dialog',
    templateUrl: './bien-dialog.component.html'
})
export class BienDialogComponent implements OnInit {

    bien: Bien;
    isSaving: boolean;

    clients: Client[];
    anneeConstructionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bienService: BienService,
        private clientService: ClientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bien.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bienService.update(this.bien));
        } else {
            this.subscribeToSaveResponse(
                this.bienService.create(this.bien));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bien>>) {
        result.subscribe((res: HttpResponse<Bien>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Bien) {
        this.eventManager.broadcast({ name: 'bienListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-bien-popup',
    template: ''
})
export class BienPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bienPopupService: BienPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bienPopupService
                    .open(BienDialogComponent as Component, params['id']);
            } else {
                this.bienPopupService
                    .open(BienDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

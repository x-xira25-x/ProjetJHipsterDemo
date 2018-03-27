import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vendeur } from './vendeur.model';
import { VendeurPopupService } from './vendeur-popup.service';
import { VendeurService } from './vendeur.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-vendeur-dialog',
    templateUrl: './vendeur-dialog.component.html'
})
export class VendeurDialogComponent implements OnInit {

    vendeur: Vendeur;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private vendeurService: VendeurService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vendeur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vendeurService.update(this.vendeur));
        } else {
            this.subscribeToSaveResponse(
                this.vendeurService.create(this.vendeur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Vendeur>>) {
        result.subscribe((res: HttpResponse<Vendeur>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Vendeur) {
        this.eventManager.broadcast({ name: 'vendeurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-vendeur-popup',
    template: ''
})
export class VendeurPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vendeurPopupService: VendeurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vendeurPopupService
                    .open(VendeurDialogComponent as Component, params['id']);
            } else {
                this.vendeurPopupService
                    .open(VendeurDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

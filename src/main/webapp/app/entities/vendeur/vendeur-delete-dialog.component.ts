import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Vendeur } from './vendeur.model';
import { VendeurPopupService } from './vendeur-popup.service';
import { VendeurService } from './vendeur.service';

@Component({
    selector: 'jhi-vendeur-delete-dialog',
    templateUrl: './vendeur-delete-dialog.component.html'
})
export class VendeurDeleteDialogComponent {

    vendeur: Vendeur;

    constructor(
        private vendeurService: VendeurService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vendeurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vendeurListModification',
                content: 'Deleted an vendeur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vendeur-delete-popup',
    template: ''
})
export class VendeurDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vendeurPopupService: VendeurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vendeurPopupService
                .open(VendeurDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vendeur } from './vendeur.model';
import { VendeurService } from './vendeur.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-vendeur',
    templateUrl: './vendeur.component.html'
})
export class VendeurComponent implements OnInit, OnDestroy {
vendeurs: Vendeur[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vendeurService: VendeurService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.vendeurService.query().subscribe(
            (res: HttpResponse<Vendeur[]>) => {
                this.vendeurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVendeurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Vendeur) {
        return item.id;
    }
    registerChangeInVendeurs() {
        this.eventSubscriber = this.eventManager.subscribe('vendeurListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

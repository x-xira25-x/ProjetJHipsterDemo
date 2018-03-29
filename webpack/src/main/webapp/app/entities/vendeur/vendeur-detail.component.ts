import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Vendeur } from './vendeur.model';
import { VendeurService } from './vendeur.service';

@Component({
    selector: 'jhi-vendeur-detail',
    templateUrl: './vendeur-detail.component.html'
})
export class VendeurDetailComponent implements OnInit, OnDestroy {

    vendeur: Vendeur;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vendeurService: VendeurService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVendeurs();
    }

    load(id) {
        this.vendeurService.find(id)
            .subscribe((vendeurResponse: HttpResponse<Vendeur>) => {
                this.vendeur = vendeurResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVendeurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vendeurListModification',
            (response) => this.load(this.vendeur.id)
        );
    }
}

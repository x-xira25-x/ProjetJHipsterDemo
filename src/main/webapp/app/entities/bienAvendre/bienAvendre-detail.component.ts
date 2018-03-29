import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BienAvendre } from './bienAvendre.model';
import { BienAvendreService } from './bienAvendre.service';

@Component({
    selector: 'jhi-bien-detail',
    templateUrl: './bienAvendre-detail.component.html'
})
export class BienAvendreDetailComponent implements OnInit, OnDestroy {

    bienAvendre: BienAvendre;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bienAvendreService: BienAvendreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBiens();
    }

    load(id) {
        this.bienAvendreService.find(id)
            .subscribe((bienResponse: HttpResponse<BienAvendre>) => {
                this.bienAvendre = bienResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBiens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bienListModification',
            (response) => this.load(this.bienAvendre.id)
        );
    }
}

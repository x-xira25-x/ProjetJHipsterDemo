import {Component, OnDestroy, OnInit} from '@angular/core';
import {Principal} from '../../shared/auth/principal.service';
 // import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {BienAvendre} from './bienAvendre.model';

@Component({
    selector: 'jhi-bienAvendre',
    templateUrl: './bienAvendre.component.html',
    styleUrls: ['./bienAvendre.css']
})
export class BienAvendreComponent implements OnInit, OnDestroy {
    bienAvendre: BienAvendre[];
    currentAccount: any;
   // eventSubscriber: Subscription;
    loadAll() {

    }
    ngOnInit() {
     /*   this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAppointments();*/
    }

    ngOnDestroy() {
       // this.eventManager.destroy(this.eventSubscriber);
    }

    /*trackId(index: number, item: Appointment) {
        return item.id;
    }*/
    registerChangeInAppointments() {
       // this.eventSubscriber = this.eventManager.subscribe('appointmentListModification', (response) => this.loadAll());
    }

    private onError(error) {

    }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VendeurComponent } from './vendeur.component';
import { VendeurDetailComponent } from './vendeur-detail.component';
import { VendeurPopupComponent } from './vendeur-dialog.component';
import { VendeurDeletePopupComponent } from './vendeur-delete-dialog.component';

@Injectable()
export class VendeurResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const vendeurRoute: Routes = [
    {
        path: 'vendeur',
        component: VendeurComponent,
        resolve: {
            'pagingParams': VendeurResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.vendeur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vendeur/:id',
        component: VendeurDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.vendeur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vendeurPopupRoute: Routes = [
    {
        path: 'vendeur-new',
        component: VendeurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.vendeur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vendeur/:id/edit',
        component: VendeurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.vendeur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vendeur/:id/delete',
        component: VendeurDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.vendeur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

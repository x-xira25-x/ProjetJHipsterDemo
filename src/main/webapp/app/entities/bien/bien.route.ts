import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BienComponent } from './bien.component';
import { BienDetailComponent } from './bien-detail.component';
import { BienPopupComponent } from './bien-dialog.component';
import { BienDeletePopupComponent } from './bien-delete-dialog.component';

@Injectable()
export class BienResolvePagingParams implements Resolve<any> {

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

export const bienRoute: Routes = [
    {
        path: 'bien',
        component: BienComponent,
        resolve: {
            'pagingParams': BienResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.bien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bien/:id',
        component: BienDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.bien.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bienPopupRoute: Routes = [
    {
        path: 'bien-new',
        component: BienPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.bien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bien/:id/edit',
        component: BienPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.bien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bien/:id/delete',
        component: BienDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.bien.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

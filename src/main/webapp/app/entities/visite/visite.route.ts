import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VisiteComponent } from './visite.component';
import { VisiteDetailComponent } from './visite-detail.component';
import { VisitePopupComponent } from './visite-dialog.component';
import { VisiteDeletePopupComponent } from './visite-delete-dialog.component';

@Injectable()
export class VisiteResolvePagingParams implements Resolve<any> {

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

export const visiteRoute: Routes = [
    {
        path: 'visite',
        component: VisiteComponent,
        resolve: {
            'pagingParams': VisiteResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.visite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'visite/:id',
        component: VisiteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.visite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const visitePopupRoute: Routes = [
    {
        path: 'visite-new',
        component: VisitePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.visite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'visite/:id/edit',
        component: VisitePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.visite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'visite/:id/delete',
        component: VisiteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projetJHipster2H2App.visite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

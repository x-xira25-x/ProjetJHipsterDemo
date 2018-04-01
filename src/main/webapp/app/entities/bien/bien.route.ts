import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BienComponent } from './bien.component';
import { BienDetailComponent } from './bien-detail.component';
import { BienPopupComponent } from './bien-dialog.component';
import { BienDeletePopupComponent } from './bien-delete-dialog.component';
import {BienVisteDialogComponent} from '../../biens-avendre/bien-avendreViste-dialog.component';
import {BienVistePopupComponent} from './bien-avendreViste-dialog.component';

export const bienRoute: Routes = [
    {
        path: 'bien',
        component: BienComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Biens'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bien/:id',
        component: BienDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Biens'
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
            pageTitle: 'Biens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bien/:id/edit',
        component: BienPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Biens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bien/:id/delete',
        component: BienDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Biens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    // test
    {
        path: 'bienVisite/:id/visite',

        component: BienVistePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BiensVisite'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

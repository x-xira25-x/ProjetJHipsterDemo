import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VendeurComponent } from './vendeur.component';
import { VendeurDetailComponent } from './vendeur-detail.component';
import { VendeurPopupComponent } from './vendeur-dialog.component';
import { VendeurDeletePopupComponent } from './vendeur-delete-dialog.component';

export const vendeurRoute: Routes = [
    {
        path: 'vendeur',
        component: VendeurComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vendeurs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vendeur/:id',
        component: VendeurDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vendeurs'
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
            pageTitle: 'Vendeurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vendeur/:id/edit',
        component: VendeurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vendeurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vendeur/:id/delete',
        component: VendeurDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Vendeurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];


import {BienVisteDialogComponent} from "./bien-avendreViste-dialog.component";
import {UserRouteAccessService} from "../shared/auth/user-route-access-service";
import {Routes} from "@angular/router";
import {BienComponent} from "../entities/bien/bien.component";
import {BienDetailComponent} from "../entities/bien/bien-detail.component";

export const bienVendreRoute: Routes = [
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

export const bienVendrePopupRoute: Routes = [

    {
    path: 'bienVisite/:id/visite',

    component: BienVisteDialogComponent,
    data: {
    authorities: ['ROLE_USER'],
        pageTitle: 'Biens'
},
canActivate: [UserRouteAccessService],
    outlet: 'popup'
},

];

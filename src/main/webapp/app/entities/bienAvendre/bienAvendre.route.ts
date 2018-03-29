import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared';
import { BienAvendreComponent} from './bienAvendre.component';

export const bienAvendreRoute: Routes = [
    {
        path: 'bienAvendre',
        component: BienAvendreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BienAvendre'
        },
        canActivate: [UserRouteAccessService]
    }
];

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetJHipster2H2SharedModule } from '../../shared';
import { ProjetJHipster2H2AdminModule } from '../../admin/admin.module';
import {
    VendeurService,
    VendeurPopupService,
    VendeurComponent,
    VendeurDetailComponent,
    VendeurDialogComponent,
    VendeurPopupComponent,
    VendeurDeletePopupComponent,
    VendeurDeleteDialogComponent,
    vendeurRoute,
    vendeurPopupRoute,
    VendeurResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...vendeurRoute,
    ...vendeurPopupRoute,
];

@NgModule({
    imports: [
        ProjetJHipster2H2SharedModule,
        ProjetJHipster2H2AdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VendeurComponent,
        VendeurDetailComponent,
        VendeurDialogComponent,
        VendeurDeleteDialogComponent,
        VendeurPopupComponent,
        VendeurDeletePopupComponent,
    ],
    entryComponents: [
        VendeurComponent,
        VendeurDialogComponent,
        VendeurPopupComponent,
        VendeurDeleteDialogComponent,
        VendeurDeletePopupComponent,
    ],
    providers: [
        VendeurService,
        VendeurPopupService,
        VendeurResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetJHipster2H2VendeurModule {}

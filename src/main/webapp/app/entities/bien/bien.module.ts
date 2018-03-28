import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetJHipster2H2SharedModule } from '../../shared';
import {
    BienService,
    BienPopupService,
    BienComponent,
    BienDetailComponent,
    BienDialogComponent,
    BienPopupComponent,
    BienDeletePopupComponent,
    BienDeleteDialogComponent,
    bienRoute,
    bienPopupRoute,
    BienResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bienRoute,
    ...bienPopupRoute,
];

@NgModule({
    imports: [
        ProjetJHipster2H2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BienComponent,
        BienDetailComponent,
        BienDialogComponent,
        BienDeleteDialogComponent,
        BienPopupComponent,
        BienDeletePopupComponent,
    ],
    entryComponents: [
        BienComponent,
        BienDialogComponent,
        BienPopupComponent,
        BienDeleteDialogComponent,
        BienDeletePopupComponent,
    ],
    providers: [
        BienService,
        BienPopupService,
        BienResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetJHipster2H2BienModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjetJHipster2H2SharedModule } from '../../shared';
import {
    VisiteService,
    VisitePopupService,
    VisiteComponent,
    VisiteDetailComponent,
    VisiteDialogComponent,
    VisitePopupComponent,
    VisiteDeletePopupComponent,
    VisiteDeleteDialogComponent,
    visiteRoute,
    visitePopupRoute,
    VisiteResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...visiteRoute,
    ...visitePopupRoute,
];

@NgModule({
    imports: [
        ProjetJHipster2H2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VisiteComponent,
        VisiteDetailComponent,
        VisiteDialogComponent,
        VisiteDeleteDialogComponent,
        VisitePopupComponent,
        VisiteDeletePopupComponent,
    ],
    entryComponents: [
        VisiteComponent,
        VisiteDialogComponent,
        VisitePopupComponent,
        VisiteDeleteDialogComponent,
        VisiteDeletePopupComponent,
    ],
    providers: [
        VisiteService,
        VisitePopupService,
        VisiteResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetJHipster2H2VisiteModule {}

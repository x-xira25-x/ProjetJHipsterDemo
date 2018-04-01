import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterDemoSharedModule } from '../../shared';
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
} from './';
import {
    BienVisteDialogComponent,
    BienVistePopupComponent
} from "./bien-avendreViste-dialog.component";

const ENTITY_STATES = [
    ...bienRoute,
    ...bienPopupRoute,
];

@NgModule({
    imports: [
        JhipsterDemoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BienComponent,
        BienDetailComponent,
        BienDialogComponent,
        BienDeleteDialogComponent,
        BienPopupComponent,
        BienDeletePopupComponent,
        BienVistePopupComponent,
        BienVisteDialogComponent
    ],
    entryComponents: [
        BienComponent,
        BienDialogComponent,
        BienPopupComponent,
        BienDeleteDialogComponent,
        BienDeletePopupComponent,
        BienVistePopupComponent,
        BienVisteDialogComponent
    ],
    providers: [
        BienService,
        BienPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDemoBienModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterDemoSharedModule } from '../../shared';
import { JhipsterDemoAdminModule } from '../../admin/admin.module';
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
} from './';

const ENTITY_STATES = [
    ...vendeurRoute,
    ...vendeurPopupRoute,
];

@NgModule({
    imports: [
        JhipsterDemoSharedModule,
        JhipsterDemoAdminModule,
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
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDemoVendeurModule {}

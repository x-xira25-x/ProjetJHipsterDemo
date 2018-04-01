import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {
    BienVisteDialogComponent,
    BienVistePopupComponent
} from "./bien-avendreViste-dialog.component";
import {bienVendrePopupRoute, bienVendreRoute} from "./bien-avendre.route";
import {RouterModule} from "@angular/router";
import {JhipsterDemoSharedModule} from "../shared/shared.module";
import {BiensAvendreService} from "./biens-avendre.service";
import {BienVisitePopupService} from "./bienVisite-popup.service";

const ENTITY_STATES = [
    ...bienVendreRoute,
    ...bienVendrePopupRoute,
];
@NgModule({
  imports: [
      JhipsterDemoSharedModule,
      RouterModule.forChild(ENTITY_STATES)
  ],
  declarations: [
      BienVisteDialogComponent,
      BienVistePopupComponent
  ],
    entryComponents: [
        BienVisteDialogComponent,
        BienVistePopupComponent
    ],
    providers: [
    BiensAvendreService,
        BienVisitePopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BiensAvendreModule { }

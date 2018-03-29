import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BienAvendreComponent} from './bienAvendre.component';
import { bienAvendreRoute} from './bienAvendre.route';
import {BienAvendreDetailComponent} from './bienAvendre-detail.component';
import {BienAvendreService} from './bienAvendre.service';
import {ProjetJHipster2H2SharedModule} from "../../shared/shared.module";

const ENTITY_STATES = [
    ...bienAvendreRoute,
];

@NgModule({
    imports: [
        ProjetJHipster2H2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        BienAvendreComponent,
        BienAvendreDetailComponent,
    ],
    entryComponents: [
        BienAvendreComponent,

    ],
    providers: [
        BienAvendreService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BienAvendreModule {}

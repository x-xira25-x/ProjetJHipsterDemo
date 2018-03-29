import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BienAvendreComponent} from './bienAvendre.component';
import { bienAvendreRoute} from './bienAvendre.route';

const ENTITY_STATES = [
    ...bienAvendreRoute,
];

@NgModule({
    imports: [

        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        BienAvendreComponent,
    ],
    entryComponents: [
        BienAvendreComponent,

    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BienAvendreModule {}

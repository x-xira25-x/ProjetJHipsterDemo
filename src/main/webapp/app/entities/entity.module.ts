import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProjetJHipster2H2ClientModule } from './client/client.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ProjetJHipster2H2ClientModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetJHipster2H2EntityModule {}

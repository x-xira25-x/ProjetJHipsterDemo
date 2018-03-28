import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProjetJHipster2H2ClientModule } from './client/client.module';
import { ProjetJHipster2H2VendeurModule } from './vendeur/vendeur.module';
import { ProjetJHipster2H2BienModule } from './bien/bien.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ProjetJHipster2H2ClientModule,
        ProjetJHipster2H2VendeurModule,
        ProjetJHipster2H2BienModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjetJHipster2H2EntityModule {}

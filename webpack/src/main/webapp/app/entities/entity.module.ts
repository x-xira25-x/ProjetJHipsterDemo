import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterDemoClientModule } from './client/client.module';
import { JhipsterDemoVendeurModule } from './vendeur/vendeur.module';
import { JhipsterDemoBienModule } from './bien/bien.module';
import { JhipsterDemoVisiteModule } from './visite/visite.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterDemoClientModule,
        JhipsterDemoVendeurModule,
        JhipsterDemoBienModule,
        JhipsterDemoVisiteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDemoEntityModule {}

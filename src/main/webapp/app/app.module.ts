import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { JhipsterDemoSharedModule, UserRouteAccessService } from './shared';
import { JhipsterDemoAppRoutingModule} from './app-routing.module';
import { JhipsterDemoHomeModule } from './home/home.module';
import { JhipsterDemoAdminModule } from './admin/admin.module';
import { JhipsterDemoAccountModule } from './account/account.module';
import { JhipsterDemoEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { StateStorageService } from './shared/auth/state-storage.service';
import { RouterModule, Routes } from '@angular/router';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';
import { BiensAvendreComponent } from './biens-avendre/biens-avendre.component';
import {BiensAvendreModule} from "./biens-avendre/biens-avendre.module";
import { VisiteClientComponent } from './visite-client/visite-client.component';

const appRoutes: Routes = [
    { path: 'jhi-biens-avendre', component: BiensAvendreComponent},
    {  path: 'jhi-visite-client', component: VisiteClientComponent}

];

@NgModule({
    imports: [
        BrowserModule,
        JhipsterDemoAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        JhipsterDemoSharedModule,
        JhipsterDemoHomeModule,
        JhipsterDemoAdminModule,
        JhipsterDemoAccountModule,
        JhipsterDemoEntityModule,
        BiensAvendreModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )




        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        BiensAvendreComponent,
        VisiteClientComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                StateStorageService,
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class JhipsterDemoAppModule {}

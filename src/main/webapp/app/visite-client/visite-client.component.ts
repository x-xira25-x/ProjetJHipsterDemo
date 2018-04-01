import { Component, OnInit } from '@angular/core';
import {Visite} from '../entities/visite/visite.model';
import {VisiteService} from '../entities/visite/visite.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {JhiAlertService} from 'ng-jhipster';
import {AccountService} from '../shared/auth/account.service';
import {SessionsComponent} from '../account/sessions/sessions.component';
import {Account} from '../shared/user/account.model';
import {Principal} from '../shared/auth/principal.service';

@Component({
  selector: 'jhi-visite-client',
  templateUrl: './visite-client.component.html',
  styles: []
})
export class VisiteClientComponent implements OnInit {
    visites: Visite[];
    login:String;
    //account: any;
    settingsAccount: any;

  constructor(
      private visiteService: VisiteService,
      private jhiAlertService: JhiAlertService,

      private account: AccountService,
      private principal: Principal

  ) { }

    loadAll() {
      //récupérer le login

       this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);


        this.visiteService.queryByclient(this.settingsAccount.login).subscribe(
            (res: HttpResponse<Visite[]>) => {
                this.visites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
       });
    }
    ngOnInit() {
        this.loadAll();
     /*   this.principal.identity().then((account) => {
            this.currentAccount = account;
        });*/
       // this.registerChangeInVisites();
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}

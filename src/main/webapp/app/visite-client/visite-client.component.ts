import { Component, OnInit } from '@angular/core';
import {Visite} from '../entities/visite/visite.model';
import {VisiteService} from '../entities/visite/visite.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {AccountService} from '../shared/auth/account.service';
import {SessionsComponent} from '../account/sessions/sessions.component';
import {Account} from '../shared/user/account.model';
import {Principal} from '../shared/auth/principal.service';
import {Client} from "../entities/client/client.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {VendeurService} from "../entities/vendeur/vendeur.service";
import {BienService} from "../entities/bien/bien.service";
import {ClientService} from "../entities/client/client.service";
import {Vendeur} from "../entities/vendeur/vendeur.model";
import {Bien} from "../entities/bien/bien.model";

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
    visite: Visite;
    isSaving: boolean;
    client: Client;
    vendeurs: Vendeur[];
    biens: Bien[];

    clients: Client[];

  constructor(
      private visiteService: VisiteService,
      private jhiAlertService: JhiAlertService,
      private account: AccountService,
      private principal: Principal,
    public activeModal: NgbActiveModal,
    private vendeurService: VendeurService,
    private bienService: BienService,
    private clientService: ClientService,
    private eventManager: JhiEventManager,


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

// essaie suppression client à la visite
    desister(idVisite) {
        console.log('entre dans la inscripton');
        // récupérer  client
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            this.bienService.findIdClient(this.settingsAccount.login).subscribe(
                (res: HttpResponse<Client>) => {
                    this.client = res.body;
                    console.log('client' + this.client.id);
                    // essayer de récupérer la visite et mettre le client dedans
                    this.visiteService.find(idVisite).subscribe(
                        (res: HttpResponse<Visite>) => {
                            this.visite=res.body;
                            //  console.log('visite'+ this.visite.id);
                            this.visite.client= null;
                            //   console.log('ajout client'+ this.visite.client.id);
                            this.visiteService.updateSansConvert(this.visite).subscribe(
                                (res: HttpResponse<Visite>) => {
                                    this.visite = res.body;
                                    console.log('update visite');
                                },
                                (res: HttpErrorResponse) => this.onError(res.message)
                            );
                        });
                    /*   this.bienService.ajoutClientVisite(idVisite,this.client.id).subscribe(
                           (res: HttpResponse<Visite>) => {
                               this.visite = res.body;
                           },
                           (res: HttpErrorResponse) => this.onError(res.message)
                       );*/
                });
        });
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

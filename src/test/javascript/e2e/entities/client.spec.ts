import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Client e2e test', () => {

    let navBarPage: NavBarPage;
    let clientDialogPage: ClientDialogPage;
    let clientComponentsPage: ClientComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Clients', () => {
        navBarPage.goToEntity('client');
        clientComponentsPage = new ClientComponentsPage();
        expect(clientComponentsPage.getTitle())
            .toMatch(/projetJHipster2H2App.client.home.title/);

    });

    it('should load create Client dialog', () => {
        clientComponentsPage.clickOnCreateButton();
        clientDialogPage = new ClientDialogPage();
        expect(clientDialogPage.getModalTitle())
            .toMatch(/projetJHipster2H2App.client.home.createOrEditLabel/);
        clientDialogPage.close();
    });

   /* it('should create and save Clients', () => {
        clientComponentsPage.clickOnCreateButton();
        clientDialogPage.setNumeroInput('5');
        expect(clientDialogPage.getNumeroInput()).toMatch('5');
        clientDialogPage.setNomInput('nom');
        expect(clientDialogPage.getNomInput()).toMatch('nom');
        clientDialogPage.setPrenomInput('prenom');
        expect(clientDialogPage.getPrenomInput()).toMatch('prenom');
        clientDialogPage.setAdresseInput('adresse');
        expect(clientDialogPage.getAdresseInput()).toMatch('adresse');
        clientDialogPage.setNpaInput('npa');
        expect(clientDialogPage.getNpaInput()).toMatch('npa');
        clientDialogPage.setLocaliteInput('localite');
        expect(clientDialogPage.getLocaliteInput()).toMatch('localite');
        clientDialogPage.setNumTelephoneInput('5');
        expect(clientDialogPage.getNumTelephoneInput()).toMatch('5');
        clientDialogPage.userSelectLastOption();
        // clientDialogPage.bienSelectLastOption();
        clientDialogPage.save();
        expect(clientDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ClientComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-client div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ClientDialogPage {
    modalTitle = element(by.css('h4#myClientLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numeroInput = element(by.css('input#field_numero'));
    nomInput = element(by.css('input#field_nom'));
    prenomInput = element(by.css('input#field_prenom'));
    adresseInput = element(by.css('input#field_adresse'));
    npaInput = element(by.css('input#field_npa'));
    localiteInput = element(by.css('input#field_localite'));
    numTelephoneInput = element(by.css('input#field_numTelephone'));
    userSelect = element(by.css('select#field_user'));
    bienSelect = element(by.css('select#field_bien'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNumeroInput = function(numero) {
        this.numeroInput.sendKeys(numero);
    };

    getNumeroInput = function() {
        return this.numeroInput.getAttribute('value');
    };

    setNomInput = function(nom) {
        this.nomInput.sendKeys(nom);
    };

    getNomInput = function() {
        return this.nomInput.getAttribute('value');
    };

    setPrenomInput = function(prenom) {
        this.prenomInput.sendKeys(prenom);
    };

    getPrenomInput = function() {
        return this.prenomInput.getAttribute('value');
    };

    setAdresseInput = function(adresse) {
        this.adresseInput.sendKeys(adresse);
    };

    getAdresseInput = function() {
        return this.adresseInput.getAttribute('value');
    };

    setNpaInput = function(npa) {
        this.npaInput.sendKeys(npa);
    };

    getNpaInput = function() {
        return this.npaInput.getAttribute('value');
    };

    setLocaliteInput = function(localite) {
        this.localiteInput.sendKeys(localite);
    };

    getLocaliteInput = function() {
        return this.localiteInput.getAttribute('value');
    };

    setNumTelephoneInput = function(numTelephone) {
        this.numTelephoneInput.sendKeys(numTelephone);
    };

    getNumTelephoneInput = function() {
        return this.numTelephoneInput.getAttribute('value');
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    bienSelectLastOption = function() {
        this.bienSelect.all(by.tagName('option')).last().click();
    };

    bienSelectOption = function(option) {
        this.bienSelect.sendKeys(option);
    };

    getBienSelect = function() {
        return this.bienSelect;
    };

    getBienSelectedOption = function() {
        return this.bienSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}

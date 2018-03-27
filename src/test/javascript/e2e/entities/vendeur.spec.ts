import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Vendeur e2e test', () => {

    let navBarPage: NavBarPage;
    let vendeurDialogPage: VendeurDialogPage;
    let vendeurComponentsPage: VendeurComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Vendeurs', () => {
        navBarPage.goToEntity('vendeur');
        vendeurComponentsPage = new VendeurComponentsPage();
        expect(vendeurComponentsPage.getTitle())
            .toMatch(/projetJHipster2H2App.vendeur.home.title/);

    });

    it('should load create Vendeur dialog', () => {
        vendeurComponentsPage.clickOnCreateButton();
        vendeurDialogPage = new VendeurDialogPage();
        expect(vendeurDialogPage.getModalTitle())
            .toMatch(/projetJHipster2H2App.vendeur.home.createOrEditLabel/);
        vendeurDialogPage.close();
    });

   /* it('should create and save Vendeurs', () => {
        vendeurComponentsPage.clickOnCreateButton();
        vendeurDialogPage.setNumeroInput('5');
        expect(vendeurDialogPage.getNumeroInput()).toMatch('5');
        vendeurDialogPage.setNomInput('nom');
        expect(vendeurDialogPage.getNomInput()).toMatch('nom');
        vendeurDialogPage.setPrenomInput('prenom');
        expect(vendeurDialogPage.getPrenomInput()).toMatch('prenom');
        vendeurDialogPage.setAdresseInput('adresse');
        expect(vendeurDialogPage.getAdresseInput()).toMatch('adresse');
        vendeurDialogPage.setNpaInput('npa');
        expect(vendeurDialogPage.getNpaInput()).toMatch('npa');
        vendeurDialogPage.setLocaliteInput('localite');
        expect(vendeurDialogPage.getLocaliteInput()).toMatch('localite');
        vendeurDialogPage.setNumTelephoneInput('5');
        expect(vendeurDialogPage.getNumTelephoneInput()).toMatch('5');
        vendeurDialogPage.userSelectLastOption();
        vendeurDialogPage.save();
        expect(vendeurDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class VendeurComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-vendeur div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class VendeurDialogPage {
    modalTitle = element(by.css('h4#myVendeurLabel'));
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

import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Visite e2e test', () => {

    let navBarPage: NavBarPage;
    let visiteDialogPage: VisiteDialogPage;
    let visiteComponentsPage: VisiteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Visites', () => {
        navBarPage.goToEntity('visite');
        visiteComponentsPage = new VisiteComponentsPage();
        expect(visiteComponentsPage.getTitle())
            .toMatch(/projetJHipster2H2App.visite.home.title/);

    });

    it('should load create Visite dialog', () => {
        visiteComponentsPage.clickOnCreateButton();
        visiteDialogPage = new VisiteDialogPage();
        expect(visiteDialogPage.getModalTitle())
            .toMatch(/projetJHipster2H2App.visite.home.createOrEditLabel/);
        visiteDialogPage.close();
    });

   /* it('should create and save Visites', () => {
        visiteComponentsPage.clickOnCreateButton();
        visiteDialogPage.setNumeroInput('5');
        expect(visiteDialogPage.getNumeroInput()).toMatch('5');
        visiteDialogPage.setDateDebutInput('2000-12-31');
        expect(visiteDialogPage.getDateDebutInput()).toMatch('2000-12-31');
        visiteDialogPage.setDateFinInput('2000-12-31');
        expect(visiteDialogPage.getDateFinInput()).toMatch('2000-12-31');
        visiteDialogPage.vendeurSelectLastOption();
        visiteDialogPage.bienSelectLastOption();
        visiteDialogPage.clientSelectLastOption();
        visiteDialogPage.save();
        expect(visiteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class VisiteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-visite div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class VisiteDialogPage {
    modalTitle = element(by.css('h4#myVisiteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numeroInput = element(by.css('input#field_numero'));
    dateDebutInput = element(by.css('input#field_dateDebut'));
    dateFinInput = element(by.css('input#field_dateFin'));
    vendeurSelect = element(by.css('select#field_vendeur'));
    bienSelect = element(by.css('select#field_bien'));
    clientSelect = element(by.css('select#field_client'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNumeroInput = function(numero) {
        this.numeroInput.sendKeys(numero);
    };

    getNumeroInput = function() {
        return this.numeroInput.getAttribute('value');
    };

    setDateDebutInput = function(dateDebut) {
        this.dateDebutInput.sendKeys(dateDebut);
    };

    getDateDebutInput = function() {
        return this.dateDebutInput.getAttribute('value');
    };

    setDateFinInput = function(dateFin) {
        this.dateFinInput.sendKeys(dateFin);
    };

    getDateFinInput = function() {
        return this.dateFinInput.getAttribute('value');
    };

    vendeurSelectLastOption = function() {
        this.vendeurSelect.all(by.tagName('option')).last().click();
    };

    vendeurSelectOption = function(option) {
        this.vendeurSelect.sendKeys(option);
    };

    getVendeurSelect = function() {
        return this.vendeurSelect;
    };

    getVendeurSelectedOption = function() {
        return this.vendeurSelect.element(by.css('option:checked')).getText();
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

    clientSelectLastOption = function() {
        this.clientSelect.all(by.tagName('option')).last().click();
    };

    clientSelectOption = function(option) {
        this.clientSelect.sendKeys(option);
    };

    getClientSelect = function() {
        return this.clientSelect;
    };

    getClientSelectedOption = function() {
        return this.clientSelect.element(by.css('option:checked')).getText();
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

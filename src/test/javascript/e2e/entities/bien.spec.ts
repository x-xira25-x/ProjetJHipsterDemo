import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Bien e2e test', () => {

    let navBarPage: NavBarPage;
    let bienDialogPage: BienDialogPage;
    let bienComponentsPage: BienComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Biens', () => {
        navBarPage.goToEntity('bien');
        bienComponentsPage = new BienComponentsPage();
        expect(bienComponentsPage.getTitle())
            .toMatch(/projetJHipster2H2App.bien.home.title/);

    });

    it('should load create Bien dialog', () => {
        bienComponentsPage.clickOnCreateButton();
        bienDialogPage = new BienDialogPage();
        expect(bienDialogPage.getModalTitle())
            .toMatch(/projetJHipster2H2App.bien.home.createOrEditLabel/);
        bienDialogPage.close();
    });

    it('should create and save Biens', () => {
        bienComponentsPage.clickOnCreateButton();
        bienDialogPage.setRueNoInput('rueNo');
        expect(bienDialogPage.getRueNoInput()).toMatch('rueNo');
        bienDialogPage.setLocaliteInput('localite');
        expect(bienDialogPage.getLocaliteInput()).toMatch('localite');
        bienDialogPage.setAnneeConstructionInput('2000-12-31');
        expect(bienDialogPage.getAnneeConstructionInput()).toMatch('2000-12-31');
        bienDialogPage.setNbPiecesInput('5');
        expect(bienDialogPage.getNbPiecesInput()).toMatch('5');
        bienDialogPage.setLibelleInput('libelle');
        expect(bienDialogPage.getLibelleInput()).toMatch('libelle');
        bienDialogPage.save();
        expect(bienDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BienComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bien div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BienDialogPage {
    modalTitle = element(by.css('h4#myBienLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    rueNoInput = element(by.css('input#field_rueNo'));
    localiteInput = element(by.css('input#field_localite'));
    anneeConstructionInput = element(by.css('input#field_anneeConstruction'));
    nbPiecesInput = element(by.css('input#field_nbPieces'));
    libelleInput = element(by.css('input#field_libelle'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRueNoInput = function(rueNo) {
        this.rueNoInput.sendKeys(rueNo);
    };

    getRueNoInput = function() {
        return this.rueNoInput.getAttribute('value');
    };

    setLocaliteInput = function(localite) {
        this.localiteInput.sendKeys(localite);
    };

    getLocaliteInput = function() {
        return this.localiteInput.getAttribute('value');
    };

    setAnneeConstructionInput = function(anneeConstruction) {
        this.anneeConstructionInput.sendKeys(anneeConstruction);
    };

    getAnneeConstructionInput = function() {
        return this.anneeConstructionInput.getAttribute('value');
    };

    setNbPiecesInput = function(nbPieces) {
        this.nbPiecesInput.sendKeys(nbPieces);
    };

    getNbPiecesInput = function() {
        return this.nbPiecesInput.getAttribute('value');
    };

    setLibelleInput = function(libelle) {
        this.libelleInput.sendKeys(libelle);
    };

    getLibelleInput = function() {
        return this.libelleInput.getAttribute('value');
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

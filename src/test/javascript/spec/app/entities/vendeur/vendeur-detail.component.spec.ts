/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ProjetJHipster2H2TestModule } from '../../../test.module';
import { VendeurDetailComponent } from '../../../../../../main/webapp/app/entities/vendeur/vendeur-detail.component';
import { VendeurService } from '../../../../../../main/webapp/app/entities/vendeur/vendeur.service';
import { Vendeur } from '../../../../../../main/webapp/app/entities/vendeur/vendeur.model';

describe('Component Tests', () => {

    describe('Vendeur Management Detail Component', () => {
        let comp: VendeurDetailComponent;
        let fixture: ComponentFixture<VendeurDetailComponent>;
        let service: VendeurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetJHipster2H2TestModule],
                declarations: [VendeurDetailComponent],
                providers: [
                    VendeurService
                ]
            })
            .overrideTemplate(VendeurDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VendeurDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VendeurService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Vendeur(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vendeur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

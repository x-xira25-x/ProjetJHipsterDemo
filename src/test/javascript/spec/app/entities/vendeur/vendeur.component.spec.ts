/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterDemoTestModule } from '../../../test.module';
import { VendeurComponent } from '../../../../../../main/webapp/app/entities/vendeur/vendeur.component';
import { VendeurService } from '../../../../../../main/webapp/app/entities/vendeur/vendeur.service';
import { Vendeur } from '../../../../../../main/webapp/app/entities/vendeur/vendeur.model';

describe('Component Tests', () => {

    describe('Vendeur Management Component', () => {
        let comp: VendeurComponent;
        let fixture: ComponentFixture<VendeurComponent>;
        let service: VendeurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemoTestModule],
                declarations: [VendeurComponent],
                providers: [
                    VendeurService
                ]
            })
            .overrideTemplate(VendeurComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VendeurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VendeurService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Vendeur(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.vendeurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

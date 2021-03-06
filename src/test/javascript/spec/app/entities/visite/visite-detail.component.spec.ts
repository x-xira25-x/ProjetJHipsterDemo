/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterDemoTestModule } from '../../../test.module';
import { VisiteDetailComponent } from '../../../../../../main/webapp/app/entities/visite/visite-detail.component';
import { VisiteService } from '../../../../../../main/webapp/app/entities/visite/visite.service';
import { Visite } from '../../../../../../main/webapp/app/entities/visite/visite.model';

describe('Component Tests', () => {

    describe('Visite Management Detail Component', () => {
        let comp: VisiteDetailComponent;
        let fixture: ComponentFixture<VisiteDetailComponent>;
        let service: VisiteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemoTestModule],
                declarations: [VisiteDetailComponent],
                providers: [
                    VisiteService
                ]
            })
            .overrideTemplate(VisiteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VisiteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisiteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Visite(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.visite).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

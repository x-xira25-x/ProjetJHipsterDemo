/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProjetJHipster2H2TestModule } from '../../../test.module';
import { VendeurDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/vendeur/vendeur-delete-dialog.component';
import { VendeurService } from '../../../../../../main/webapp/app/entities/vendeur/vendeur.service';

describe('Component Tests', () => {

    describe('Vendeur Management Delete Component', () => {
        let comp: VendeurDeleteDialogComponent;
        let fixture: ComponentFixture<VendeurDeleteDialogComponent>;
        let service: VendeurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProjetJHipster2H2TestModule],
                declarations: [VendeurDeleteDialogComponent],
                providers: [
                    VendeurService
                ]
            })
            .overrideTemplate(VendeurDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VendeurDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VendeurService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

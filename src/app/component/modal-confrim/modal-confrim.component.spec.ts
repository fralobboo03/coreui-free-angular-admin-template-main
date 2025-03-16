import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfrimComponent } from './modal-confrim.component';

describe('ModalConfrimComponent', () => {
  let component: ModalConfrimComponent;
  let fixture: ComponentFixture<ModalConfrimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfrimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

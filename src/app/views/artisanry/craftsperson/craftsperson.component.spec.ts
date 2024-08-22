import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftspersonComponent } from './craftsperson.component';

describe('CraftspersonComponent', () => {
  let component: CraftspersonComponent;
  let fixture: ComponentFixture<CraftspersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CraftspersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CraftspersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

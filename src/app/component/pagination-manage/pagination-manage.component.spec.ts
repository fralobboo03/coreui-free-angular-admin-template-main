import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationManageComponent } from './pagination-manage.component';

describe('PaginationManageComponent', () => {
  let component: PaginationManageComponent;
  let fixture: ComponentFixture<PaginationManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

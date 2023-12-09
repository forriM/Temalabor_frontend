import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupsubjectComponent } from './pickupsubject.component';

describe('PickupsubjectComponent', () => {
  let component: PickupsubjectComponent;
  let fixture: ComponentFixture<PickupsubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupsubjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickupsubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

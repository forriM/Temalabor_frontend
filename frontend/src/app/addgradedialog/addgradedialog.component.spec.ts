import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgradedialogComponent } from './addgradedialog.component';

describe('AddgradedialogComponent', () => {
  let component: AddgradedialogComponent;
  let fixture: ComponentFixture<AddgradedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddgradedialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddgradedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolltoexamComponent } from './enrolltoexam.component';

describe('EnrolltoexamComponent', () => {
  let component: EnrolltoexamComponent;
  let fixture: ComponentFixture<EnrolltoexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrolltoexamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrolltoexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

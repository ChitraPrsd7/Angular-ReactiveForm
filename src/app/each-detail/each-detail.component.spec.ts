import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachDetailComponent } from './each-detail.component';

describe('EachDetailComponent', () => {
  let component: EachDetailComponent;
  let fixture: ComponentFixture<EachDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EachDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EachDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

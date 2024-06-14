import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCateqComponent } from './register-cateq.component';

describe('RegisterCateqComponent', () => {
  let component: RegisterCateqComponent;
  let fixture: ComponentFixture<RegisterCateqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCateqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCateqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

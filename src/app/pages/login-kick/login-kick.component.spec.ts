import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginKickComponent } from './login-kick.component';

describe('LoginKickComponent', () => {
  let component: LoginKickComponent;
  let fixture: ComponentFixture<LoginKickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginKickComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginKickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

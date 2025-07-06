import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickChatComponent } from './kick-chat.component';

describe('KickChatComponent', () => {
  let component: KickChatComponent;
  let fixture: ComponentFixture<KickChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KickChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KickChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

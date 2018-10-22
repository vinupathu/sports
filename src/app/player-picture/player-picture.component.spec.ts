import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPictureComponent } from './player-picture.component';

describe('PlayerPictureComponent', () => {
  let component: PlayerPictureComponent;
  let fixture: ComponentFixture<PlayerPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

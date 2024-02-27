/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LocalMultiplayerComponent } from './localMultiplayer.component';

describe('LocalMultiplayerComponent', () => {
  let component: LocalMultiplayerComponent;
  let fixture: ComponentFixture<LocalMultiplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalMultiplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalMultiplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

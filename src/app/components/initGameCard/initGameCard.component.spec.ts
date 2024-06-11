/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InitGameCardComponent } from './initGameCard.component';

describe('InitGameCardComponent', () => {
  let component: InitGameCardComponent;
  let fixture: ComponentFixture<InitGameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitGameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

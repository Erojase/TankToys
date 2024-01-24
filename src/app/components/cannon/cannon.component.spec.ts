/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CannonComponent } from './cannon.component';

describe('CannonComponent', () => {
  let component: CannonComponent;
  let fixture: ComponentFixture<CannonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CannonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CannonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

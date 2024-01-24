/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BulletComponent } from './bullet.component';

describe('BulletComponent', () => {
  let component: BulletComponent;
  let fixture: ComponentFixture<BulletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

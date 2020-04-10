import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KungComponent } from './kung.component';

describe('KungComponent', () => {
  let component: KungComponent;
  let fixture: ComponentFixture<KungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueadosComponent } from './bloqueados.component';

describe('BloqueadosComponent', () => {
  let component: BloqueadosComponent;
  let fixture: ComponentFixture<BloqueadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloqueadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloqueadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

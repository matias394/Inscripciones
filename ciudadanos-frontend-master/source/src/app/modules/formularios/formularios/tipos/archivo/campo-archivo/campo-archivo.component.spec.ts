import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CampoArchivoComponent } from './campo-archivo.component';

describe('CampoArchivoComponent', () => {
  let component: CampoArchivoComponent;
  let fixture: ComponentFixture<CampoArchivoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoArchivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

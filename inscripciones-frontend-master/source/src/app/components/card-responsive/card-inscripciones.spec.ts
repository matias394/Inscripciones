import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardInscripcionesComponent } from './card-inscripciones.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('CardInscripcionesComponent', () => {
  let component: CardInscripcionesComponent;
  let fixture: ComponentFixture<CardInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardInscripcionesComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => {
                  if (param === 'yourParamName') {
                    return 'mockParamValue';
                  }
                  return null;
                },
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar un mensaje cuando listaVacia es verdadero y currentSearchTerm no está configurado', () => {
    component.listaVacia = true;
    fixture.detectChanges();
    const mensajeElement = fixture.nativeElement.querySelector(
      '.mensaje-lista-vacia'
    );
    expect(mensajeElement.textContent).toContain(
      'No hay elementos en la lista.'
    );
  });

  it('debería mostrar un mensaje cuando sinResultados es verdadero y currentSearchTerm está configurado', () => {
    component.sinResultados = true;
    component.currentSearchTerm = 'búsqueda';
    fixture.detectChanges();
    const mensajeElement = fixture.nativeElement.querySelector(
      '.mensaje-sin-resultados'
    );
    expect(mensajeElement.textContent).toContain(
      'No se encontraron resultados para "búsqueda".'
    );
  });

  it('debería mostrar detalles del curso cuando se proporcionan datos y messageButton es "Ver"', () => {
    const mockData = {
      nombreCurso: 'Mi Curso',
      descripcion: 'Descripción del curso',
      messageButton: 'Ver',
    };
    component.data = mockData;
    fixture.detectChanges();
    const nombreCursoElement =
      fixture.nativeElement.querySelector('.nombre-curso');
    const descripcionElement =
      fixture.nativeElement.querySelector('.descripcion-curso');
    const buttonElement = fixture.nativeElement.querySelector('.button-ver');

    expect(nombreCursoElement.textContent).toContain(mockData.nombreCurso);
    expect(descripcionElement.textContent).toContain(mockData.descripcion);
    expect(buttonElement.textContent).toContain(mockData.messageButton);
  });

  it('debería expandir los detalles del curso cuando se hace clic en el botón "Ver"', () => {
    const mockData = {
      nombreCurso: 'Mi Curso',
      descripcion: 'Descripción del curso',
      messageButton: 'Ver',
    };
    component.data = mockData;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('.button-ver');
    buttonElement.click();
    fixture.detectChanges();

    const detallesCursoElement =
      fixture.nativeElement.querySelector('.detalles-curso');
    expect(detallesCursoElement).toBeTruthy();
  });
});

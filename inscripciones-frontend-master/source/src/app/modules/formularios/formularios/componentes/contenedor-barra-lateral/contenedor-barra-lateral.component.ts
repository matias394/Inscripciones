import { SeccionesService } from './../../services/secciones.service';
import { BarraComponentesComponent } from './../barra-componentes/barra-componentes.component';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, OnDestroy } from '@angular/core';
import { ComunicacionBarraSeccionesService } from '../../services/comunicacion-barra-secciones.service';
import { takeUntil } from 'rxjs/operators';
//import { SuscripcionCancelable } from 'src/app/shared/modelo/suscripcion-cancelable';

@Component({
  selector: 'app-contenedor-barra-lateral',
  templateUrl: './contenedor-barra-lateral.component.html',
  styleUrls: ['./contenedor-barra-lateral.component.css']
})
export class ContenedorBarraLateralComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  @ViewChild(BarraComponentesComponent, { static: true }) barra: BarraComponentesComponent;

  @Input() contenedor: any;

  private altoExpansorPx: number;
  private DOMElementActual: ElementRef;

  constructor(
    private comunicacionBarraSeccionesService: ComunicacionBarraSeccionesService,
    private seccionesService: SeccionesService,
  ) {
    //super();
  }

  ngOnInit() {
    this.altoExpansorPx = 0;
    this.comunicacionBarraSeccionesService.campoSeleccionado.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      (el: ElementRef) => {
        this.DOMElementActual = el;
        this.posicionarBarra();
      }
    );
    this.seccionesService.seccionEliminada.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      () => {
        setTimeout(() => {
          this.posicionarBarra();
        });
      }
    );
    this.comunicacionBarraSeccionesService.campoEliminado.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      () => {
        if (this.comunicacionBarraSeccionesService.claveActual === null) {
          // se elimino el campo que estaba seleccionado
          setTimeout(() => {
            this.reiniciarBarra();
          });
        }
      }
    );
    this.seccionesService.seccionesImportadas.pipe(
     // takeUntil(this.destroyed$)
    ).subscribe(
      () => {
        // al importar las secciones se debe reiniciar la barra
        this.reiniciarBarra();
      }
    );
    this.seccionesService.seccionSeleccionadaEliminada.pipe(
      //takeUntil(this.destroyed$)
    ).subscribe(
      () => {
        setTimeout(() => {
          this.reiniciarBarra();
        });
      }
    );
  }

  reiniciarBarra() {
    // deshabilitamos la barra
    this.barra.disabled = true;
    // volvemos la barra a la posicion original
    this.altoExpansorPx = 0;
    this.DOMElementActual = null;
  }

  posicionarBarra() {
    if (!this.DOMElementActual) { return; }
    this.barra.disabled = false;
    this.altoExpansorPx = this.DOMElementActual.nativeElement.getBoundingClientRect().top - this.contenedor.getBoundingClientRect().top;
  }

  get altoExpansor() {
    return {
      height: this.altoExpansorPx + 'px'
    };
  }
}

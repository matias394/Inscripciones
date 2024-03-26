import { Component, Renderer2, HostListener, ViewChild, ElementRef, AfterViewInit, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-tipo-campo-formulario',
  templateUrl: './modal-tipo-campo-formulario.component.html',
  styleUrls: ['./modal-tipo-campo-formulario.component.css']
})
export class ModalTipoCampoFormularioComponent implements OnInit, AfterViewInit {

  @Input() deshabilitarNoPresentes: boolean;

  @ViewChild('general', { static: true }) general: ElementRef;
  @ViewChild('validaciones', { static: true }) validaciones: ElementRef;
  @ViewChild('visibilidad', { static: true }) visibilidad: ElementRef;

  private tabActual: 'general' | 'validaciones' | 'visibilidad' = 'general';
  tabActual$ = new Subject<'general' | 'validaciones' | 'visibilidad'>();

  tabsDisponibilidad = {
    general: true,
    validaciones: true,
    visibilidad: true,
  };

  visible = false;
  visibleAnimate = false;

  mostrarAdvertenciaDependencia = false;
  mensajeAdvertencia:any;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const x = event.keyCode;
    if (x === 27) {
      this.hide();
    }
  }

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.deshabilitarNoPresentes = Boolean(this.deshabilitarNoPresentes);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tabsDisponibilidad.general = this.general.nativeElement.childNodes.length === 0;
      this.tabsDisponibilidad.validaciones = this.validaciones.nativeElement.childNodes.length === 0;
      this.tabsDisponibilidad.visibilidad = this.visibilidad.nativeElement.childNodes.length === 0;
    });
  }

  show(): void {
    this.visible = true;
    const timeout = 50;
    setTimeout(() => (this.visibleAnimate = true), timeout);
    this.renderer.addClass(document.body, 'modal-open');
  }

  hide(): void {
    this.visibleAnimate = false;
    const timeout = 50;
    setTimeout(() => (this.visible = false), timeout);
    this.renderer.removeClass(document.body, 'modal-open');
  }

  getNavitemClases(tab: 'general' | 'validaciones' | 'visibilidad') {
    return {
      hided: !this.deshabilitarNoPresentes && this.tabsDisponibilidad[tab],
      disabled: this.tabsDisponibilidad[tab],
      active: tab === this.tabActual
    };
  }

  getTabPaneClases(tab: 'general' | 'validaciones' | 'visibilidad') {
    return {
      show: tab === this.tabActual,
      active: tab === this.tabActual
    };
  }

  setCurrentTab(tab: 'general' | 'validaciones' | 'visibilidad') {
    this.tabActual = tab;
    this.tabActual$.next(tab);
  }
}

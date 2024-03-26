import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesComponent } from './inscripciones.component';
import { FormComponent } from './form/form.component';
import { NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from '@components/toggle-switch/toggle-switch.module';
import { DatePikerModule } from '@components/date-piker/date-piker.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { TimePikerModule } from '@components/time-piker/time-piker.module';
import { SelectSearchModule } from '@components/select-search/select-search.module';
import { ModalsModule } from '@components/modals/modals.module';
import { AlertasModule } from '@components/alertas/alertas.module';
import { PaginationModule } from '@components/pagination/pagination.module';
import { ReplacePipe } from '@pipes/replace.pipe';
import { DayCheckPipe } from '@pipes/dayCheck.pipe';
import { ShortTime } from '@pipes/shortTime';
import { ErrorInputModule } from '@components/error-input/error-input.module';
import { TextInputModule } from '@components/baseInputs/text-input/text-input.module';
import { SelectInputModule } from '@components/baseInputs/select/select.module';
import { StepOneComponent } from './form/steps/step-one/step-one.component';
import { StepHeadComponent } from './form/steps/step-head/step-head.component';
import { StepTwoComponent } from './form/steps/step-two/step-two.component';
import { StepThreeComponent } from './form/steps/step-three/step-three.component';
import { ModalInstanciaComponent } from './form/modal-instancia/modal-instancia.component';
import { ModalFormsComponent } from './form/modal-forms/modal-forms.component';
import { CheckboxModule } from '@components/baseInputs/checkbox/checkbox.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS,
} from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CustomDatepickerI18n } from '@utils/datepicker-i18n-es';
import { SedeNamePipe } from '@pipes/sedeById.pipe';
import { PipesModule } from '@pipes/pipes.module';
import { SearchModule } from '@components/search/search.module';

@NgModule({
  declarations: [
    InscripcionesComponent,
    FormComponent,
    ReplacePipe,
    DayCheckPipe,
    SedeNamePipe,
    ShortTime,
    StepOneComponent,
    StepHeadComponent,
    StepTwoComponent,
    StepThreeComponent,
    ModalInstanciaComponent,
    ModalFormsComponent,
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    NgbModule,
    FormsModule,
    ToggleSwitchModule,
    DatePikerModule,
    ReactiveFormsModule,
    TimePikerModule,
    CdkStepperModule,
    NgStepperModule,
    SelectSearchModule,
    ModalsModule,
    PaginationModule,
    AlertasModule,
    ErrorInputModule,
    TextInputModule,
    SelectInputModule,
    CheckboxModule,
    MatRadioModule,
    MatCheckboxModule,
    SearchModule,
    MatTableModule,
    MatIconModule,
    PipesModule,
  ],
  providers: [{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
})
export class InscripcionesModule {}

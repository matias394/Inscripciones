import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormulariosService } from '@shared/services/formularios.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '@modules/auth/token-storage.service';

@Component({
  selector: 'app-previsualizacion',
  templateUrl: './previsualizacion.component.html',
  styleUrls: ['./previsualizacion.component.css'],
})
export class PrevisualizacionComponent {
  @Input() formId: { title: string };
  @Input() activeStep: number;
  token: string;
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];

  @Output() saveFormResult = new EventEmitter<any>();

  // formId: String = ''

  constructor(
    private formulariosService: FormulariosService,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getJwtToken();
    const data = {
      formId: this.formId,
    };

    this.formulariosService.fetchFormulario(data, this.token).subscribe({
      next: (data) => {
        let fields = JSON.parse(data[0].campos.replaceAll("'", '"'));

        this.fields = fields[0].fields;
        console.log('data :>> ', this.fields);
      },
      error: (err) => {
        console.log('err :>> ', err);
      },
    });
  }

  onSubmit(model: any) {
    console.log(model);
    this.saveFormResult.emit(model);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeStep'] && changes['activeStep']?.currentValue === 3) {
      this.onSubmit(this.model);
    }
  }

  sendResponse(): void {}
}

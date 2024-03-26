import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormulariosService } from '@modules/formularios/formularios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-previsualizacion',
  templateUrl: './previsualizacion.component.html',
  styleUrls: ['./previsualizacion.component.css'],
})
export class PrevisualizacionComponent {
  form = new FormGroup({});
  model = {};
  formId: String = '';
  formData: any = [];
  fields: FormlyFieldConfig[] = [];

  constructor(
    private formulariosService: FormulariosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.formId = params['formId'];
    });

    const data = {
      formId: this.formId,
    };

    this.formulariosService.fetchFormulario(data).subscribe({
      next: (data) => {
        this.formData = data[0];
        console.log('data :>> ', data[0].inputGroup);

        this.fields = data[0].inputGroup;
      },
      error: (err) => {
        console.log('err :>> ', err);
      },
    });
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  onSubmit(model: any) {
    console.log(model);
  }

  goBack(): void {
    window.history.back();
  }

  sendResponse(): void {}
}

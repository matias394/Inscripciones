import { TemplateOption } from './template-option';

export abstract class FormlyComponent {
  id: string;
  key: string;
  type: string;
  templateOptions: TemplateOption;
  subsanable: boolean;
}

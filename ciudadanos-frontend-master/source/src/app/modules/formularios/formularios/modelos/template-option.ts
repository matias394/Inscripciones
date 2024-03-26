export class TemplateOption {
  label: string;
  required: boolean;
  pattern?: string;
  options?: any[];

  constructor(label: string, required: boolean, pattern?: string, options?: any[]) {
    this.label = label;
    this.required = required;
    this.pattern = pattern;
    this.options = options ? options : null;
  }
}

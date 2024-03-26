import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appConfig'
})
export class AppConfigPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

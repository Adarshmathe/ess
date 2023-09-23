import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'p'
})
export class PPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

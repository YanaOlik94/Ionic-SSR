import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    if (value?.length <= maxLength) {
      return value;
    } else {
      return value?.substr(0, maxLength) + '...';
    }
  }
}

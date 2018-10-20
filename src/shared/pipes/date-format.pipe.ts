import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: string, format: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, format);
    return value;
  }
}

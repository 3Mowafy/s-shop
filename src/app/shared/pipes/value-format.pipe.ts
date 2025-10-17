import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueFormat',
})
export class ValueFormatPipe implements PipeTransform {
  constructor(private _datePipe: DatePipe) {}
  transform(value: any, key?: string): any {
    if (!value) return '-';

    if (
      typeof value === 'string' &&
      key == 'createdAt' &&
      !isNaN(Date.parse(value))
    )
      return this._datePipe.transform(value, 'dd/MM/yyyy hh:mm a');

    return value;
  }
}

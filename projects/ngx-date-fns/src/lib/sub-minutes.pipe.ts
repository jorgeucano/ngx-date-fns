import { Pipe, PipeTransform } from '@angular/core';
import { isInvalidDate } from './utils';
import { subMinutes } from 'date-fns';

@Pipe({ name: 'dfnsSubMinutes' })
export class SubMinutesPipe implements PipeTransform {
  static readonly NO_ARGS_ERROR = 'dfnsSubMinutes: missing required arguments';

  transform(date: Date | string | number, amount: number): Date {
    if (isInvalidDate(date)) {
      throw new Error(SubMinutesPipe.NO_ARGS_ERROR);
    }
    return subMinutes(date, amount || 0);
  }
}

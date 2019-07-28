import { Pipe, PipeTransform } from '@angular/core';
import { isInvalidDate } from './utils';
import { differenceInYears } from 'date-fns';

@Pipe({ name: 'dfnsDifferenceInYears' })
export class DifferenceInYearsPipe implements PipeTransform {
  static readonly NO_ARGS_ERROR =
    'dfnsDifferenceInYears: missing required arguments';

  transform(
    dateLeft: string | number | Date,
    dateRight: string | number | Date
  ): number {
    if (isInvalidDate(dateLeft) || isInvalidDate(dateRight)) {
      throw new Error(DifferenceInYearsPipe.NO_ARGS_ERROR);
    }
    return differenceInYears(dateLeft, dateRight);
  }
}

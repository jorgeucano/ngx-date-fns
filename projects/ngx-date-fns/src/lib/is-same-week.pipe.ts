import {
  ChangeDetectorRef,
  NgModule,
  OnDestroy,
  Pipe,
  PipeTransform
} from '@angular/core';
import { DateFnsInputDate, DateFnsWeekIndex } from './types';
import { Subscription } from 'rxjs';
import {
  calculateLocale,
  DateFnsConfigurationService
} from './date-fns-configuration.service';
import isSameWeek from 'date-fns/isSameWeek';

@Pipe({ name: 'dfnsIsSameWeek', pure: false })
export class IsSameWeekPipe implements PipeTransform, OnDestroy {
  private localeChanged$: Subscription;

  constructor(
    public config: DateFnsConfigurationService,
    public cd: ChangeDetectorRef
  ) {
    this.localeChanged$ = this.config.localeChanged.subscribe(_ =>
      this.cd.markForCheck()
    );
  }

  ngOnDestroy(): void {
    this.localeChanged$.unsubscribe();
  }

  transform(
    dateLeft: DateFnsInputDate,
    dateRight: DateFnsInputDate,
    options?: {
      locale?: Locale;
      weekStartsOn?: DateFnsWeekIndex;
    }
  ): boolean {
    return isSameWeek(
      dateLeft,
      dateRight,
      calculateLocale(options, this.config)
    );
  }
}

@NgModule({
  declarations: [IsSameWeekPipe],
  exports: [IsSameWeekPipe]
})
export class IsSameWeekPipeModule {}

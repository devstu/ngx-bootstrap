import { MonthsCalendarViewModel, MonthViewModel } from '../models/index';
import { isSameMonth } from '../../bs-moment/utils/date-getters';
import { isSameOrAfter, isSameOrBefore } from '../../bs-moment/utils/date-compare';
import { endOf, startOf } from '../../bs-moment/utils/start-end-of';

export interface FlagMonthCalendarOptions {
  minDate: Date;
  maxDate: Date;
  hoveredMonth: Date;
  displayMonths: number;
  monthIndex: number;
}

export function flagMonthsCalendar(monthCalendar: MonthsCalendarViewModel,
                                   options: FlagMonthCalendarOptions): MonthsCalendarViewModel {
  monthCalendar.months
    .forEach((months: MonthViewModel[], rowIndex: number) => {
      months.forEach((month: MonthViewModel, monthIndex: number) => {
        const isHovered = isSameMonth(month.date, options.hoveredMonth);
        const isDisabled = isMonthDisabled(month.date, options.minDate, options.maxDate)
        const newMonth = Object.assign(/*{},*/ month, {isHovered, isDisabled});
        if (month.isHovered !== newMonth.isHovered
          || month.isDisabled !== newMonth.isDisabled) {
          monthCalendar.months[rowIndex][monthIndex] = newMonth;
        }
      });
    });

  // todo: add check for linked calendars
  monthCalendar.hideLeftArrow = options.monthIndex > 0
    && options.monthIndex !== options.displayMonths;
  monthCalendar.hideRightArrow = options.monthIndex < options.displayMonths
    && (options.monthIndex + 1) !== options.displayMonths;

  return monthCalendar;
}

function isMonthDisabled(date: Date, min: Date, max: Date): boolean {
  const minBound = min && isSameOrBefore(endOf(date, 'month'), min, 'day');
  const maxBound = max && isSameOrAfter(startOf(date, 'month'), max, 'day');

  return minBound || maxBound;
}

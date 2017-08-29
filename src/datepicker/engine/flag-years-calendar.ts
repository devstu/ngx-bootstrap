import { MonthsCalendarViewModel, MonthViewModel, YearsCalendarViewModel, YearViewModel } from '../models/index';
import { isSameMonth, isSameYear } from '../../bs-moment/utils/date-getters';
import { isSameOrAfter, isSameOrBefore } from '../../bs-moment/utils/date-compare';
import { endOf, startOf } from '../../bs-moment/utils/start-end-of';

export interface FlagYearsCalendarOptions {
  minDate: Date;
  maxDate: Date;
  hoveredYear: Date;
  displayMonths: number;
  yearIndex: number;
}

export function flagYearsCalendar(yearsCalendar: YearsCalendarViewModel, options: FlagYearsCalendarOptions): YearsCalendarViewModel {
  yearsCalendar.years
    .forEach((years: YearViewModel[], rowIndex: number) => {
      years.forEach((year: YearViewModel, yearIndex: number) => {
        const isHovered = isSameYear(year.date, options.hoveredYear);
        const isDisabled = isYearDisabled(year.date, options.minDate, options.maxDate);

        const newMonth = Object.assign(/*{},*/ year, {isHovered, isDisabled});
        if (year.isHovered !== newMonth.isHovered
          || year.isDisabled !== newMonth.isDisabled) {
          yearsCalendar.years[rowIndex][yearIndex] = newMonth;
        }
      });
    });

  // todo: add check for linked calendars
  yearsCalendar.hideLeftArrow = options.yearIndex > 0
    && options.yearIndex !== options.displayMonths;
  yearsCalendar.hideRightArrow = options.yearIndex < options.displayMonths
    && (options.yearIndex + 1) !== options.displayMonths;

  return yearsCalendar;
}

function isYearDisabled(date: Date, min: Date, max: Date): boolean {
  const minBound = min && isSameOrBefore(endOf(date, 'year'), min, 'day');
  const maxBound = max && isSameOrAfter(startOf(date, 'year'), max, 'day');

  return minBound || maxBound;
}

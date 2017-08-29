import { isSameYear } from '../../bs-moment/utils/date-getters';
import { YearsCalendarViewModel, CalendarCellViewModel } from '../models/index';
import { isYearDisabled } from '../utils/bs-calendar-utils';

export interface FlagYearsCalendarOptions {
  minDate: Date;
  maxDate: Date;
  hoveredYear: Date;
  displayMonths: number;
  yearIndex: number;
}

export function flagYearsCalendar(yearsCalendar: YearsCalendarViewModel, options: FlagYearsCalendarOptions): YearsCalendarViewModel {
  yearsCalendar.years
    .forEach((years: CalendarCellViewModel[], rowIndex: number) => {
      years.forEach((year: CalendarCellViewModel, yearIndex: number) => {
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

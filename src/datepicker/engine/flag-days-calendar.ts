import { DayViewModel, DaysCalendarViewModel, WeekViewModel } from '../models/index';
import { isSameDay, isSameMonth } from '../../bs-moment/utils/date-getters';
import { isSameOrAfter, isSameOrBefore } from '../../bs-moment/utils/date-compare';

export interface FlagDaysCalendarOptions {
  minDate: Date;
  maxDate: Date;
  hoveredDate: Date;
  selectedDate: Date;
  selectedRange: Date[];
  displayMonths: number;
  monthIndex: number;
}

export function flagDaysCalendar(formattedMonth: DaysCalendarViewModel,
                                 options: FlagDaysCalendarOptions): DaysCalendarViewModel {
  formattedMonth.weeks
    .forEach((week: WeekViewModel, weekIndex: number) => {
      week.days.forEach((day: DayViewModel, dayIndex: number) => {
        // datepicker
        const isOtherMonth = !isSameMonth(day.date, formattedMonth.month);

        const isHovered = !isOtherMonth && isSameDay(day.date, options.hoveredDate);
        // date range picker
        const isSelectionStart = !isOtherMonth && isSameDay(day.date, options.selectedRange[0]);
        const isSelectionEnd = !isOtherMonth && isSameDay(day.date, options.selectedRange[1]);

        const isSelected = !isOtherMonth && isSameDay(day.date, options.selectedDate) ||
          isSelectionStart || isSelectionEnd;

        const isInRange = !isOtherMonth && isDateInRange(day.date, options.selectedRange, options.hoveredDate);

        const isDisabled = isSameOrBefore(day.date, options.minDate, 'day')
          || isSameOrAfter(day.date, options.maxDate, 'day');

        // decide update or not
        const newDay = Object.assign(/*{},*/ day, {
          isOtherMonth,
          isHovered,
          isSelected,
          isSelectionStart,
          isSelectionEnd,
          isInRange,
          isDisabled
        });

        if (day.isOtherMonth !== newDay.isOtherMonth ||
          day.isHovered !== newDay.isHovered ||
          day.isSelected !== newDay.isSelected ||
          day.isSelectionStart !== newDay.isSelectionStart ||
          day.isSelectionEnd !== newDay.isSelectionEnd ||
          day.isDisabled !== newDay.isDisabled ||
          day.isInRange !== newDay.isInRange) {
          week.days[dayIndex] = newDay;
        }
      });
    });

  // todo: add check for linked calendars
  formattedMonth.hideLeftArrow = options.monthIndex > 0
    && options.monthIndex !== options.displayMonths;
  formattedMonth.hideRightArrow = options.monthIndex < options.displayMonths
    && (options.monthIndex + 1) !== options.displayMonths;

  return formattedMonth;
}

function isDateInRange(date: Date, selectedRange: Date[], hoveredDate: Date): boolean {
  if (!date || !selectedRange[0]) {
    return false;
  }

  if (selectedRange[1]) {
    return date > selectedRange[0] && date <= selectedRange[1];
  }

  if (hoveredDate) {
    return date > selectedRange[0] && date <= hoveredDate;
  }

  return false;
}

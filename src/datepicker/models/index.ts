import { TimeUnit } from '../../bs-moment/types';
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';
import { BsDatepickerEffects } from '../reducer/bs-datepicker.effects';
import { BsCustomDates } from '../themes/bs/bs-custom-dates-view.component';

export type BsDatepickerViewMode = 'day' | 'month' | 'year';

/** *************** */
// navigation bar settings
export interface NavigationViewModel {
  monthTitle: string;
  yearTitle: string;
  hideLeftArrow?: boolean;
  hideRightArrow?: boolean;
  disableLeftArrow?: boolean;
  disableRightArrow?: boolean;
}

export interface CalendarCellViewModel {
  date: Date;
  label: string;
  isDisabled?: boolean;
  isHovered?: boolean;
}

/** *************** */
// days matrix: day cell view model
export interface DayViewModel extends CalendarCellViewModel {
  isOtherMonth?: boolean;
  isInRange?: boolean;
  isSelectionStart?: boolean;
  isSelectionEnd?: boolean;
  isSelected?: boolean;
  // day index
  monthIndex?: number;
  weekIndex?: number;
  dayIndex?: number;
}

export interface WeekViewModel {
  days: DayViewModel[];
}

// todo: split navigation settings
export interface DaysCalendarViewModel extends NavigationViewModel {
  weeks: WeekViewModel[];
  // additional information
  month: Date;
  weekNumbers: string[];
  weekdays: string[];
}

/** *************** */
// months calendar
export interface MonthsCalendarViewModel extends NavigationViewModel {
  months: CalendarCellViewModel[][];
}

/** *************** */
// years calendar
export interface YearsCalendarViewModel extends NavigationViewModel {
  years: CalendarCellViewModel[][];
}

/** *************** */

// math model
/** *************** */

// days Date's array
export interface DaysCalendarModel {
  daysMatrix: Date[][];
  month: Date;
}

/** *************** */
// some func options
export interface MonthViewOptions {
  width?: number;
  height?: number;
  firstDayOfWeek?: number;
}

/** *************** */
// rendering options
export interface DatepickerFormatOptions {
  locale: string;

  monthTitle: string;
  yearTitle: string;

  dayLabel: string;
  monthLabel: string;
  yearLabel: string;

  weekNumbers: string;
}

export interface DatepickerRenderOptions {
  showWeekNumbers?: boolean;
  displayMonths?: number;
}

/** *************** */
// events
/** *************** */
export enum BsNavigationDirection {UP, DOWN}

// used for navigation events, to change view date in state
export interface BsNavigationEvent {
  direction?: BsNavigationDirection;
  step?: TimeUnit;
}

export interface BsViewNavigationEvent {
  unit?: TimeUnit;
  viewMode: BsDatepickerViewMode;
}

export interface CellHoverEvent {
  cell: CalendarCellViewModel;
  isHovered: boolean;
}

// todo: move to base class
// datepicker container component
/* tslint:disable no-empty */
export abstract class BsDatepickerContainer {
  /** @deperecated */
  _customRangesFish: BsCustomDates[] = [
    {label: 'today', value: new Date()},
    {label: 'today1', value: new Date()},
    {label: 'today2', value: new Date()},
    {label: 'today3', value: new Date()}
  ];

  _effects: BsDatepickerEffects;

  set minDate(value: Date) {
    this._effects.setMinDate(value);
  }

  set maxDate(value: Date) {
    this._effects.setMaxDate(value);
  }


  viewMode: Observable<BsDatepickerViewMode>;
  daysCalendar: Observable<DaysCalendarViewModel[]>;
  monthsCalendar: Observable<MonthsCalendarViewModel[]>;
  yearsCalendar: Observable<YearsCalendarViewModel[]>;
  options: Observable<DatepickerRenderOptions>;

  setViewMode(event: BsDatepickerViewMode): void {}

  navigateTo(event: BsNavigationEvent): void {}

  dayHoverHandler(event: CellHoverEvent): void {}

  monthHoverHandler(event: CellHoverEvent): void {}

  yearHoverHandler(event: CellHoverEvent): void {}

  daySelectHandler(day: DayViewModel): void {};

  monthSelectHandler(event: CalendarCellViewModel): void {}

  yearSelectHandler(event: CalendarCellViewModel): void {}

  _stopPropagation(event: any): void {
    event.stopPropagation();
  }
}

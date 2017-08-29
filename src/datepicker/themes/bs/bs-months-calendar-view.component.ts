import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BsDatepickerViewMode, BsNavigationDirection,
  BsNavigationEvent,
  DatepickerRenderOptions, CellHoverEvent, MonthsCalendarViewModel,
  CalendarCellViewModel
} from '../../models/index';

@Component({
  selector: 'bs-month-calendar-view',
  template: `
    <!--current date-->
    <bs-current-date title="hey there"></bs-current-date>

    <div class="bs-datepicker-head">
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>
    </div>

    <div class="bs-datepicker-body">
      <table role="grid" class="months">
        <tbody>
        <tr *ngFor="let row of calendar.months">
          <td *ngFor="let month of row" role="gridcell"
              (click)="viewMonth(month)"
              (mouseenter)="hoverMonth(month, true)"
              (mouseleave)="hoverMonth(month, false)"
              [class.disabled]="month.isDisabled"
              [class.is-highlighted]="month.isHovered">
            <span>{{ month.label }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!--timepicker-->
    <bs-timepicker></bs-timepicker>
  `
})
export class BsMonthCalendarViewComponent {
  @Input() calendar: MonthsCalendarViewModel;

  @Output() onNavigate = new EventEmitter<BsNavigationEvent>();
  @Output() onViewMode = new EventEmitter<BsDatepickerViewMode>();

  @Output() onSelect = new EventEmitter<CalendarCellViewModel>();
  @Output() onHover = new EventEmitter<CellHoverEvent>();

  navigateTo(event: BsNavigationDirection): void {
    const step = BsNavigationDirection.DOWN === event ? -1 : 1;
    this.onNavigate.emit({step: {year: step}});
  }

  viewMonth(month: CalendarCellViewModel) {
    this.onSelect.emit(month);
  }

  hoverMonth(cell: CalendarCellViewModel, isHovered: boolean) {
    this.onHover.emit({cell, isHovered});
  }

  changeViewMode(event: BsDatepickerViewMode): void {
    this.onViewMode.emit(event);
  }
}

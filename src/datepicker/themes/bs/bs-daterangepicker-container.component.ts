import { Component, EventEmitter, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerContainer, DayViewModel } from '../../models/index';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';

@Component({
  selector: 'bs-daterangepicker-container',
  providers: [BsDatepickerStore],
  templateUrl: './bs-datepicker-view.html',
  host: {
    '(click)': '_stopPropagation($event)',
    style: 'position: absolute; display: block;'
  }
})
export class BsDaterangepickerContainerComponent
  extends BsDatepickerContainer
  implements OnInit {

  set value(value: Date[]) {
    this._store.dispatch(this._actions.selectRange(value || []));
  }

  valueChange = new EventEmitter<Date[]>();

  _rangeStack: Date[] = [];

  constructor(private _config: BsDatepickerConfig,
              private _store: BsDatepickerStore,
              private _actions: BsDatepickerActions,
              _effects: BsDatepickerEffects) {
    super();
    this._effects = _effects;
  }

  ngOnInit(): void {
    this._effects
      .init(this._store)
      // intial state options
      // todo: fix this, split configs
      .setOptions(Object.assign({}, this._config, {displayMonths: 2}))
      // data binding view --> model
      .setBindings(this)
      // set event handlers
      .setEventHandlers(this)
      .registerDatepickerSideEffects();

    // todo: move it somewhere else
    // on selected date change
    this._store.select(state => state.selectedRange)
      .subscribe(date => this.valueChange.emit(date));
  }

  daySelectHandler(day: DayViewModel): void {
    if (day.isOtherMonth || day.isDisabled) {
      return;
    }

    // if only one date is already selected
    // and user clicks on previous date
    // start selection from new date
    // but if new date is after initial one
    // than finish selection
    if (this._rangeStack.length === 1) {
      this._rangeStack = day.date >= this._rangeStack[0]
        ? [this._rangeStack[0], day.date]
        : [day.date];
    }

    if (this._rangeStack.length === 0) {
      this._rangeStack = [day.date];
    }

    this._store.dispatch(this._actions.selectRange(this._rangeStack));

    if (this._rangeStack.length === 2) {
      this._rangeStack = [];
    }
  }
}

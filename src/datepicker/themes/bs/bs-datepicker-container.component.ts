import { Component, OnInit } from '@angular/core';

import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerContainer } from '../../models/index';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';

@Component({
  selector: 'bs-datepicker-container',
  providers: [BsDatepickerStore, BsDatepickerEffects],
  templateUrl: './bs-datepicker-view.html',
  host: {
    '(click)': '_stopPropagation($event)',
    style: 'position: absolute; display: block;'
  }
})
export class BsDatepickerContainerComponent
  extends BsDatepickerContainer
  implements OnInit {

  constructor(private _config: BsDatepickerConfig,
              private _store: BsDatepickerStore,
              _effects: BsDatepickerEffects) {
    super();
    this._effects = _effects;
  }

  ngOnInit(): void {
    this._effects
      .init(this._store)
      // intial state options
      .setOptions(this._config)
      // data binding view --> model
      .setBindings(this)
      // set event handlers
      .setEventHandlers(this)
      .registerDatepickerSideEffects();
  }

  _stopPropagation(event: any): void {
    event.stopPropagation();
  }
}

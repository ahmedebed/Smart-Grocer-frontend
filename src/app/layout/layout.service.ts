import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private _collapsed = new BehaviorSubject<boolean>(false);
  collapsed$ = this._collapsed.asObservable();

  toggle() {
    this._collapsed.next(!this._collapsed.value);
  }

  setCollapsed(v: boolean) {
    this._collapsed.next(v);
  }

  get value() {
    return this._collapsed.value;
  }
}

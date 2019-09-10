import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SharedService {

  value: any;
  store: { [key: string]: any } = {};
  currentUser: IUserClaim;
  globalEventEmitter: EventEmitter<string> = new EventEmitter();
  public language = new BehaviorSubject<string>('');
  public userUpdate = new BehaviorSubject<boolean>(false);
  public currentUserObservable = new Subject<{ [key: string]: any }>();

  constructor() {
  }

  public getData(key: string) {
    return this.store[key];
  }

  public setData(data: any, key: string) {
    this.store[key] = data;
    this.currentUserObservable.next(this.store);
  }

  public clearDataByKey(key: string) {
    this.store[key] = undefined;
  }

  public clearAllData() {
    this.store = {};
    this.currentUser = null;
  }

  public clearStoreExcept(exclusion?: string) {
    if (exclusion) {
      this.store = Object.assign({}, this.store[exclusion]);
      return;
    }
    this.store = {};
  }

  emitGlobalEventEmitter(data: string) {
    this.globalEventEmitter.emit(data);
  }

  getGlobalEventEmitter() {
    return this.globalEventEmitter;
  }
}

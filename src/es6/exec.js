'use strict';
import {Observable, BehaviorSubject, Subject, ReplaySubject, AsyncSubject, Scheduler, AjaxResponse} from "@reactivex/rxjs";

Observable.prototype.multiplyByTen = function multiplyByTen() {
  var input = this;
  return Observable.create(function subscribe(observer) {
    input.subscribe({
      next: (v) => observer.next(10 * v),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
}
var observable = Observable.from([1, 2, 3, 4]).multiplyByTen();
observable.subscribe(x => console.log(x));

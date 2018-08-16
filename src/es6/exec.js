'use strict';
import {Observable, BehaviorSubject, Subject, ReplaySubject, AsyncSubject, Scheduler, AjaxResponse} from "@reactivex/rxjs";

/**
 * Created this to test observable with function, however prototypal with typescript 3 was too challenging at this stage.
 */
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

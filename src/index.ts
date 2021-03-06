

import {Observable, BehaviorSubject, Subject, ReplaySubject, AsyncSubject, Scheduler, AjaxResponse} from 'rxjs';

var button = document.querySelector('#button');

/**
 * First observable, view that this is a synch call, only the one with timeout is async
 */
// var observable = Observable.create(function (observer:any) {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   setTimeout(() => {
//     observer.next(4);
//     observer.complete();
//   }, 1000);
// });
// console.log('just before subscribe');
// observable.subscribe({
//   next: (x:number) => console.log('got value ' + x),
//   error: (err:number) => console.error('something wrong occurred: ' + err),
//   complete: () => console.log('done'),
// });
// console.log('just after subscribe');

/**
 * Simple subscribe with observable.
 */
// var foo = Observable.create(function(observer:any) {
//   console.log('Hello');
//   observer.next(42);
// });
//
// foo.subscribe(function(x:number) {
//   console.log(x);
// });
//
// foo.subscribe(function(y:number) {
//   console.log(y);
// });
//
// foo.subscribe(function(y:number) {
//   console.log(y);
// });

/**
 * Show multiple subscription and unsubscribe method
 */
// var observable = Observable.create(function subscribe(observer:any) {
//   var id = setInterval(() => {
//     observer.next("hello");
//     console.log("PRINT");
//   }, 1000);
//
//   return function unsubsribe() {
//     clearInterval(id);
//   }
// });
// observable.subscribe((x:number) => console.log("A"+x)).unsubscribe();
// observable.subscribe((x:number) => console.log("B"+x)).unsubscribe();
// observable.subscribe((x:number) => console.log("C"+x)).unsubscribe();

/**
 * This is different than subject, notice that counter for B is less 1, this proves that observable are created PER subscription.
 */
// var observer = {
//   next: (x:string) => console.log('Observer got a next value: ' + x),
//   error: (err:string) => console.error('Observer got an error: ' + err),
//   complete: () => console.log('Observer got a complete notification'),
// };
// var observable = Observable.create(function subscribe(observer:any) {
//   var counter = 0;
//   var id = setInterval(() => {
//     counter++;
//     if(counter < 20) {
//         observer.next("hello:"+counter);
//     }
//     else {
//       observer.error("got error, > 10");
//     }
//   }, 1000);
// });
// observable.subscribe(observer);
// setTimeout(() => {
//     observable.subscribe((count:string) => console.log("B:"+count));
// }, 2000);

/**
 * It's similar to topic, previous messages are no longer resent.
 */
// var subject = new Subject();
// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });
// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);

/**
 * Subject is a subset of observable.
 */
// var subject = new Subject();
// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });
// var observable = Observable.from([1, 2, 3]);
// observable.subscribe(subject); // You can subscribe providing a Subject

/**
 * Subject is a subset of observable.
1. First Observer subscribes to the multicasted Observable
2. The multicasted Observable is connected
3. The next value 0 is delivered to the first Observer
4. Second Observer subscribes to the multicasted Observable
5. The next value 1 is delivered to the first Observer
6. The next value 1 is delivered to the second Observer
7. First Observer unsubscribes from the multicasted Observable
8. The next value 2 is delivered to the second Observer
9. Second Observer unsubscribes from the multicasted Observable
10. The connection to the multicasted Observable is unsubscribed
 */
// var source = Observable.interval(500);
// var subject = new Subject();
// var multicasted = source.multicast(subject);
// var subscription1:any, subscription2:any, subscriptionConnect:any;
//
// console.log('observerA subscribed');
// subscription1 = multicasted.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// subscriptionConnect = multicasted.connect();
//
// setTimeout(() => {
//   console.log('observerB subscribed');
//   subscription2 = multicasted.subscribe({
//     next: (v) => console.log('observerB: ' + v)
//   });
// }, 600);
//
// setTimeout(() => {
//   console.log('observerA unsubscribed');
//   subscription1.unsubscribe();
// }, 1200);
//
// // We should unsubscribe the shared Observable execution here,
// // because `multicasted` would have no more subscribers after this
// setTimeout(() => {
//   console.log('observerB unsubscribed');
//   subscription2.unsubscribe();
//   subscriptionConnect.unsubscribe(); // for the shared Observable execution
// }, 2000);

/**
 * Comes packaged with initial value, similar to functional's reduce.
 */
// var subject = new BehaviorSubject(0); // 0 is the initial value
// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// subject.next(1);
// subject.next(2);
// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });
// subject.next(3);

/**
 * Save a number of previous call, when another subscribers entered, they get the last N saved value.
 */
// var subject = new ReplaySubject(3); // buffer 3 values for new subscribers
// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// subject.next(1);
// subject.next(10);
// subject.next(2);
// subject.next(3);
// subject.next(4);
// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });
// subject.next(5);

/**
 * Only last value before complete will be displayed. Similar to async, last value is only returned to output.
 */
// var subject = new AsyncSubject(); // Only 5 will appear
// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });
// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);
// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });
// subject.next(5);
// subject.complete();

/**
 * Functional method in observable. Prototypal can't be use here.
 */
// function multiplyByTen(input:any) {
//   var output = Observable.create(function subscribe(observer:any) {
//     input.subscribe({
//       next: (v:number) => observer.next(10 * v),
//       error: (err:string) => observer.error(err),
//       complete: () => observer.complete()
//     });
//   });
//   return output;
// }
// var input = Observable.from([1, 2, 3, 4]);
// var output = multiplyByTen(input);
// output.subscribe((x:number) => console.log(x));

/**
 * Create as async, refer first example where Observable is synch + asycn. This is actually not a scheduler - the name is.
 */
// var observable = Observable.create(function (observer:any) {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   observer.complete();
// })
// .observeOn(Scheduler.async);
// console.log('just before subscribe');
// observable.subscribe({
//   next: (x:number) => console.log('got value ' + x),
//   error: (err:string) => console.error('something wrong occurred: ' + err),
//   complete: () => console.log('done'),
// });
// console.log('just after subscribe');

// var observable = Observable.create(function (proxyObserver:any) {
//   proxyObserver.next(1);
//   proxyObserver.next(2);
//   proxyObserver.next(3);
//   proxyObserver.complete();
// })
// .observeOn(Scheduler.async);
// var finalObserver = {
//   next: (x:number) => console.log('got value ' + x),
//   error: (err:string) => console.error('something wrong occurred: ' + err),
//   complete: () => console.log('done'),
// };
// console.log('just before subscribe');
// observable.subscribe(finalObserver);
// console.log('just after subscribe');


/**
 * Make button observable, clicking will increase counter
*/
// Observable.fromEvent(button, 'click')
// .scan((count:number) => count + 1, 0)
// .subscribe(count => console.log(`Clicked ${count} times`));



/**
 * Sample for button click, with 1 second gap.
*/
// Observable.fromEvent(button, 'click')
// .throttleTime(1000)
// .scan((count:number) => count + 1, 0)
// .subscribe(count => console.log(`Clicked ${count} times`));

/**
 * Sample for button click, with 1 second gap and output only the mouse x position.
*/
// Observable.fromEvent<MouseEvent>(button, 'click')
// .throttleTime(1000)
// .map(event => event.clientX)
// .scan((count:number, clientX:number) => count + clientX, 0)
// .subscribe(count => console.log(`Clicked ${count} times`));

/**
 * Sample for button click, with 1 second gap and mouse x + count
*/
// Observable.fromEvent<MouseEvent>(button, 'click')
// .throttleTime(1000)
// .map(event => 2)
// .scan((count:number, clientX) => count + clientX, 0)
// .subscribe(count => console.log(`Clicked ${count} times`));


/**
 * Sample for ajax call, this is a text output and not json.
*/
const reply = Observable.ajax({
  url:'https://raw.githubusercontent.com/yoonghan/presentation/master/2018/demo/sample.js',
    crossDomain: true,
    responseType: "text",
    createXHR: function () {
      return new XMLHttpRequest();
    }
}); //can use .map(resp => resp.reponse) ... but typescript will break.
reply.subscribe({
  next: (resp:AjaxResponse) => console.log(resp.response),
  error: (err:AjaxResponse) => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});

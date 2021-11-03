import {
  fromEvent,
  Observable,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';

// const search$ = new Observable<Event>((observer) => {
//   const search = document.getElementById('search');
//   search?.addEventListener('input', (e) => {
//     observer.next(e);
//   });
// });

// Через rxjs

const search$: Observable<Event> = fromEvent<Event>(
  document.getElementById('search') as HTMLElement,
  'input'
);
const stop$: Observable<Event> = fromEvent<Event>(
  document.getElementById('stop') as HTMLElement,
  'click'
);

search$
  .pipe(
    map((event) => (event.target as HTMLInputElement).value),
    debounceTime(500),
    map((value) => (value.length > 3 ? value : '')),
    distinctUntilChanged(),
    takeUntil(stop$)
  )
  .subscribe((value) => {
    console.log(value);
  });

// setTimeout(() => {
//   console.log('unsubscribed');
//   searchSubscription.unsubscribe();
// }, 10000);

import { OperatorFunction } from '../interfaces/operator';
import { Observable } from '../observables/observable';

export function takeUntil<T>(
  predicate: (newValue: T) => boolean
): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    let take = true;
    const outputObservable = new Observable<T>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        take = !predicate(newValue);

        if (!take) {
          outputObservable.complete();
        }

        outputObservable.next(newValue);
      },
      () => {
        outputObservable.complete();
      }
    );

    return outputObservable;
  };
}

import { OperatorFunction } from '../interfaces/operator';
import { Observable } from '../observables/observable';

export function filter<T>(
  predicate: (newValue: T) => boolean
): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    const outputObservable = new Observable<T>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        if (predicate(newValue)) {
          outputObservable.next(newValue);
        }
      },
      () => {
        outputObservable.complete();
      }
    );

    return outputObservable;
  };
}

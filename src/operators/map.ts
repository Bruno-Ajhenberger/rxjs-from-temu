import { OperatorFunction } from '../interfaces/operator';
import { Observable } from '../observables/observable';

export function map<T, R>(
  predicate: (newValue: T) => R
): OperatorFunction<T, R> {
  return (source: Observable<T>) => {
    const outputObservable = new Observable<R>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        const mappedValue = predicate(newValue);
        outputObservable.next(mappedValue);
      },
      () => {
        outputObservable.complete();
      }
    );

    return outputObservable;
  };
}

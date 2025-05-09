import { OperatorFunction } from '../interfaces/operator';
import { Observable } from '../observables/observable';

export function merge<T>(observable: Observable<T>): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    const outputObservable = new Observable<T>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        outputObservable.next(newValue);
      },
      () => {
        outputObservable.complete();
      }
    );

    observable.subscribe((newValue: T) => {
      outputObservable.next(newValue);
    });

    return outputObservable;
  };
}

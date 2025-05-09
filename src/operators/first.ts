import { OperatorFunction } from '../interfaces/operator';
import { Observable } from '../observables/observable';

export function first<T>(): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    const outputObservable = new Observable<T>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        outputObservable.next(newValue);
        outputObservable.complete();
      },
      () => {
        outputObservable.complete();
      }
    );
    return outputObservable;
  };
}

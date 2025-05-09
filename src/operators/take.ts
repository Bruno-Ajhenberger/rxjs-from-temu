import { OperatorFunction } from '../interfaces/operator';
import { Observable } from '../observables/observable';

export function take<T>(takeCount: number): OperatorFunction<T, T> {
  let currentCount = 0;
  return (source: Observable<T>) => {
    const outputObservable = new Observable<T>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        if (currentCount < takeCount) {
          outputObservable.next(newValue);
          ++currentCount;
        } else {
          source.complete();
        }
      },
      () => {
        outputObservable.complete();
      }
    );
    return outputObservable;
  };
}

import { OperatorFunction } from '../interfaces/operator';
import { Observable } from '../observables/observable';

export function skip<T>(skipCount: number): OperatorFunction<T, T> {
  let currentCount = 0;
  return (source: Observable<T>) => {
    const outputObservable = new Observable<T>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        if (currentCount < skipCount) {
          ++currentCount;
        } else {
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

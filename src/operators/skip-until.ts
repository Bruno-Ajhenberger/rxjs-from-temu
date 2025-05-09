import { OperatorFunction } from '../interfaces/operator';
import { Observable } from '../observables/observable';

export function skipUntil<T>(
  predicate: (newValue: T) => boolean
): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    let skip = true;
    const outputObservable = new Observable<T>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        if (skip) {
          skip = !predicate(newValue);
        }
        if (!skip) {
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

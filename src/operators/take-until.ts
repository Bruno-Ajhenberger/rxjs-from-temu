import { OperatorFunction } from "../interfaces/operator";
import { Observable } from "../observables/observable";

export function takeUntil<T>(
  predicate: (newValue: T) => boolean
): OperatorFunction<T, T> {
  let take = true;
  return (source: Observable<T>) => {
    const outputObservable = new Observable<T>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        take = !predicate(newValue);

        if (!take) {
          source.complete();
          return;
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

import { OperatorFunction } from "../interfaces/operator";
import { Observable } from "../observables/observable";

export function withLatestFrom<T, R>(
  outerObservable: Observable<R>
): OperatorFunction<T, [R | null, T]> {
  let latestValue: R | null = null;
  return (source: Observable<T>) => {
    const outputObservable = new Observable<[R | null, T]>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        outputObservable.next([latestValue, newValue]);
      },
      () => {
        outputObservable.complete();
      }
    );

    outerObservable.subscribe((value) => {
      latestValue = value;
    });
    return outputObservable;
  };
}

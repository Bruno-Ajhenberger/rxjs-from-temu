import { OperatorFunction } from "../interfaces/operator";
import { ISubscribable } from "../interfaces/subscribable";
import { Observable } from "../observables/observable";

export function withLatestFrom<T, R>(
  outerObservable: ISubscribable<R>
): OperatorFunction<T, [R | null, T]> {
  let latestValue: R | null = null;
  return (source: Observable<T>) => {
    const outputObservable = new Observable<[R | null, T]>(source.unsubscribe);
    const subscription = source.subscribe(
      (newValue: T) => {
        outputObservable.next([latestValue, newValue]);
      },
      () => {
        outputObservable.complete();
      },
      (error) => {
        outputObservable.error(error);
      }
    );

    subscription.add(
      outerObservable.subscribe((value) => {
        latestValue = value;
      })
    );

    return outputObservable;
  };
}

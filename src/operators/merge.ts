import { OperatorFunction } from "../interfaces/operator";
import { ISubscribable } from "../interfaces/subscribable";
import { Observable } from "../observables/observable";

export function merge<T>(
  outerObservable: ISubscribable<T>
): OperatorFunction<T, T> {
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

    outerObservable.subscribe((newValue: T) => {
      outputObservable.next(newValue);
    });

    return outputObservable;
  };
}

import { OperatorFunction } from '../interfaces/operator';
import { Observable } from '../observables/observable';

export function debounce<T>(debounceTime: number): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    const outputObservable = new Observable<T>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        setTimeout(() => {
          outputObservable.next(newValue);
        }, debounceTime);
      },
      () => {
        outputObservable.complete();
      }
    );
    return outputObservable;
  };
}

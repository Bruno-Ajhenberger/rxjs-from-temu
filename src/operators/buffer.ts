import { OperatorFunction } from '../interfaces/operator';
import { Observable } from '../observables/observable';

export function buffer<T>(bufferSize: number): OperatorFunction<T, T[]> {
  let currentBuffer: T[] = [];
  return (source: Observable<T>) => {
    const outputObservable = new Observable<T[]>(source.unsubscribe);
    source.subscribe(
      (newValue: T) => {
        currentBuffer.push(newValue);
        if (currentBuffer.length === bufferSize) {
          outputObservable.next(currentBuffer);
          currentBuffer = [];
        }
      },
      () => {
        outputObservable.complete();
      }
    );
    return outputObservable;
  };
}

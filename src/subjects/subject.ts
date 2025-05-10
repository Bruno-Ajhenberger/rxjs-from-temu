import { SubscriptionClosedError } from "../errors/subscription-closed-error";
import { OperatorFunction } from "../interfaces/operator";
import { IPipeable } from "../interfaces/pipeable";
import { ISubscribable } from "../interfaces/subscribable";
import { Observable } from "../observables/observable";
import { Subscription } from "../subscription/Subscription";

export class Subject<T> implements ISubscribable<T>, IPipeable<T> {
  protected sources: Observable<T>[] = [];
  protected isClosed = false;

  subscribe(
    next?: (value: T) => void,
    error?: (error?: Error | string) => void,
    complete?: () => void
  ): Subscription {
    const newSourceObservable = new Observable<T>(() => {
      this.removeSource(newSourceObservable);
    });
    newSourceObservable.subscribe(next, complete, error);

    this.sources.push(newSourceObservable);
    return new Subscription(() => {
      this.removeSource(newSourceObservable);
    });
  }

  next(newValue: T): void {
    if (this.isClosed) {
      return;
    }
    this.notifyObservers(newValue);
  }

  unsubscribe(): void {
    this.sources = [];
    this.isClosed = true;
  }

  protected removeSource(source: Observable<T>): void {
    const filteredObserverList = this.sources.filter((s) => s !== source);
    this.sources = filteredObserverList;
  }

  protected notifyObservers(newValue: T): void {
    this.sources.forEach((s) => s.next(newValue));
  }

  complete(): void {
    this.isClosed = true;
    this.sources.forEach((s) => s.complete());
  }

  error(error?: Error | string): void {
    this.sources.forEach((s) => s.error(error));
  }

  pipe(): Observable<T>;
  pipe<A>(operator: OperatorFunction<T, A>): Observable<A>;
  pipe<A, B>(
    operatorA: OperatorFunction<T, A>,
    operatorB: OperatorFunction<A, B>
  ): Observable<B>;
  pipe<A, B, C>(
    operatorA: OperatorFunction<T, A>,
    operatorB: OperatorFunction<A, B>,
    operatorC: OperatorFunction<B, C>
  ): Observable<C>;
  pipe<A, B, C, D>(
    operatorA: OperatorFunction<T, A>,
    operatorB: OperatorFunction<A, B>,
    operatorC: OperatorFunction<B, C>,
    operatorD: OperatorFunction<C, D>
  ): Observable<D>;
  pipe<A, B, C, D, E>(
    operatorA: OperatorFunction<T, A>,
    operatorB: OperatorFunction<A, B>,
    operatorC: OperatorFunction<B, C>,
    operatorD: OperatorFunction<C, D>,
    operatorE: OperatorFunction<D, E>
  ): Observable<E>;
  pipe<A, B, C, D, E, F>(
    operatorA: OperatorFunction<T, A>,
    operatorB: OperatorFunction<A, B>,
    operatorC: OperatorFunction<B, C>,
    operatorD: OperatorFunction<C, D>,
    operatorE: OperatorFunction<D, E>,
    operatorF: OperatorFunction<E, F>
  ): Observable<F>;
  pipe(...operators: OperatorFunction<any, any>[]): Observable<any> {
    const source = new Observable<T>(this.removeSource);
    this.sources.push(source);
    return operators.reduce(
      (currentObservable: Observable<any>, operator) =>
        operator(currentObservable),
      source
    );
  }
}

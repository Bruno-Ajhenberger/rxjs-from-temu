import { OperatorFunction } from "../interfaces/operator";
import { ISubscribable } from "../interfaces/subscribable";
import { Observer } from "../internal/observer";
import { Subscription } from "../subscription/Subscription";

export class Observable<T> implements ISubscribable<T> {
  private isClosed = false;
  private observer!: Observer<T> | null;

  constructor(public parentUnsubscribeRef?: (ref: Observable<T>) => void) {}

  subscribe = (
    next?: (newValue: T) => void,
    complete?: () => void,
    error?: (error?: Error | string) => void
  ): Subscription => {
    this.observer = new Observer(next, complete, error);
    return new Subscription(this.unsubscribe);
  };

  next = (newValue: T) => {
    if (this.isClosed || !this.observer || !this.observer.next) {
      return;
    }
    this.observer.next(newValue);
  };

  complete = () => {
    this.isClosed = true;
    if (this.observer && this.observer.complete) {
      this.observer.complete();
    }
  };

  error = (error?: Error | string) => {
    if (this.observer && this.observer.error) {
      this.observer.error(error);
    }
  };

  unsubscribe = () => {
    if (this.parentUnsubscribeRef) {
      this.parentUnsubscribeRef(this);
    }
    this.observer = null;
  };

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
    return operators.reduce(
      (currentObservable: Observable<any>, operator) =>
        operator(currentObservable),
      this
    );
  }
}

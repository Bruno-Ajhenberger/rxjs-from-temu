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
    newSourceObservable.subscribe(next, error, complete);

    this.sources.push(newSourceObservable);
    return new Subscription(() => {
      this.removeSource(newSourceObservable);
    });
  }

  next(newValue: T): void {
    if (this.isClosed) {
      throw new SubscriptionClosedError();
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
  }

  error(): void {}

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

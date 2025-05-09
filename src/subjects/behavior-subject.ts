import { DataSource } from '../internal/data-source';
import { Observable } from '../observables/observable';
import { Subscription } from '../subscription/Subscription';
import { Subject } from './subject';

export class BehaviorSubject<T> extends Subject<T> {
  private dataSource = new DataSource<T>();

  constructor(startValue: T) {
    super();
    this.dataSource.setData(startValue);
  }

  public override subscribe(
    next?: (value: T) => void,
    error?: (error?: Error | string) => void,
    complete?: () => void
  ): Subscription {
    const newSourceObservable = new Observable<T>(() => {
      this.removeSource(newSourceObservable);
    });
    newSourceObservable.subscribe(next, error, complete);

    this.sources.push(newSourceObservable);
    newSourceObservable.next(this.dataSource.getData());
    return new Subscription(() => {
      this.removeSource(newSourceObservable);
    });
  }

  getValue(): T | null {
    return this.dataSource.getData();
  }
}

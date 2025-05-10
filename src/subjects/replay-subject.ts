import { SubscriptionClosedError } from "../errors/subscription-closed-error";
import { SubjectHistoryCaretaker } from "../internal/subject-history-caretaker";
import { Observable } from "../observables/observable";
import { Subscription } from "../subscription/Subscription";
import { Subject } from "./subject";

export class ReplaySubject<T> extends Subject<T> {
  private caretaker: SubjectHistoryCaretaker<T>;

  constructor(historyLength: number, startValue?: T) {
    super();
    this.caretaker = new SubjectHistoryCaretaker(historyLength, startValue);
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
    this.emitHistory(newSourceObservable);
    return new Subscription(() => {
      this.removeSource(newSourceObservable);
    });
  }

  public override next(newValue: T): void {
    this.caretaker.saveToHistory(newValue);
    super.next(newValue);
  }

  getValues(): Array<T> {
    return this.caretaker.getHistory();
  }

  private emitHistory(source: Observable<T>) {
    this.caretaker.getHistory().forEach((s) => source.next(s));
  }
}

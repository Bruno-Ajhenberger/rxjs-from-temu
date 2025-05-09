import { Observable } from '../observables/observable';
import { Subscription } from '../subscription/Subscription';

export interface ISubscribable<T> {
  pipe(): Observable<T>;
  unsubscribe: () => void;
  complete: () => void;
  error: () => void;
  next: (newValue: T) => void;
  subscribe: (
    next?: (newValue: T) => void,
    complete?: () => void,
    error?: (error?: Error | string) => void
  ) => Subscription;
}

import { Observable } from './../observables/observable';
export type OperatorFunction<T, R> = (source: Observable<T>) => Observable<R>;

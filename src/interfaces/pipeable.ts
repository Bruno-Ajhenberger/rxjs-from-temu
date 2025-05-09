import { Observable } from "../observables/observable";
import { OperatorFunction } from "./operator";

export interface IPipeable<T> {
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
}

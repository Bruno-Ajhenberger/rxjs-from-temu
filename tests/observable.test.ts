import { Observable } from "./../src/observables/observable";
import { describe, expect, it, vi } from "vitest";

describe("Observable", () => {
  it("should emit values to subscriber", () => {
    const observable = new Observable<string>();
    const callback = vi.fn();

    observable.subscribe(callback);
    observable.next("test 1");
    observable.next("test 2");

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith("test 1");
    expect(callback).toHaveBeenCalledWith("test 2");
  });

  it("should call error", () => {
    const observable = new Observable<string>();
    const error = vi.fn();

    observable.subscribe(undefined, undefined, error);
    observable.error("test error");

    expect(error).toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith("test error");
  });

  it("should call complete", () => {
    const observable = new Observable<string>();
    const complete = vi.fn();

    observable.subscribe(undefined, complete, undefined);
    observable.complete();

    expect(complete).toHaveBeenCalled();
  });

  it("should not emit after complete", () => {
    const observable = new Observable<string>();
    const next = vi.fn();

    observable.subscribe(next);
    observable.next("test 1");
    observable.complete();
    observable.next("test 2");

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenLastCalledWith("test 1");
  });
});

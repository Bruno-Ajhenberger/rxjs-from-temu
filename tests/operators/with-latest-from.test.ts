import { describe, expect, it, vi } from "vitest";
import { Observable } from "../../index";
import { withLatestFrom } from "../../src/operators/with-latest-from";

describe("Observable piped with latest from operator", () => {
  it("should emit value with latest emited value from outher observable", () => {
    const observable = new Observable<string>();
    const outerObservable = new Observable<number>();
    const next = vi.fn();

    observable.pipe(withLatestFrom(outerObservable)).subscribe(next);
    outerObservable.next(1);
    observable.next("test");

    expect(next).toHaveBeenLastCalledWith([1, "test"]);
  });
});

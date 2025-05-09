import { describe, expect, it, vi } from "vitest";
import { Observable, takeUntil } from "../../index";

describe("Observable piped with take until operator", () => {
  it("should complete after predicate match", () => {
    const observable = new Observable<string>();
    const complete = vi.fn();

    observable
      .pipe(takeUntil((value) => value.length > 5))
      .subscribe(undefined, complete);
    observable.next("test 1");
    observable.next("test 2");
    observable.next("test");

    expect(complete).toBeCalled();
  });

  it("should not emit after predicate match", () => {
    const observable = new Observable<string>();
    const next = vi.fn();

    observable.pipe(takeUntil((value) => value.length === 3)).subscribe(next);
    observable.next("test 1");
    observable.next("test 2");
    observable.next("aaa");

    expect(next).toHaveBeenLastCalledWith("test 2");
  });
});

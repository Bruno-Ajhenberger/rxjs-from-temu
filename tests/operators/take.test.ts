import { describe, expect, it, vi } from "vitest";
import { Observable, take } from "../../index";

describe("Observable piped with take operator", () => {
  it("should complete after x number of emits", () => {
    const observable = new Observable<string>();
    const complete = vi.fn();

    observable.pipe(take(1)).subscribe(undefined, complete);
    observable.next("test 1");
    observable.next("test 2");

    expect(complete).toBeCalled();
  });

  it("should not emit after x number of emits", () => {
    const observable = new Observable<string>();
    const next = vi.fn();

    observable.pipe(take(1)).subscribe(next);
    observable.next("test 1");
    observable.next("test 2");

    expect(next).toHaveBeenLastCalledWith("test 1");
  });
});

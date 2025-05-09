import { describe, expect, it, vi } from "vitest";
import { filter, Observable } from "../../index";

describe("Observable piped with filter operator", () => {
  it("should only emit values that satisfy predicate", () => {
    const observable = new Observable<string>();
    const next = vi.fn();

    observable.pipe(filter((value) => value.length === 3)).subscribe(next);
    observable.next("test 1");
    observable.next("aaa");
    observable.next("test 2");

    expect(next).toHaveBeenCalledWith("aaa");
    expect(next).not.toHaveBeenCalledWith("test 1");
    expect(next).not.toHaveBeenCalledWith("test 2");
  });
});

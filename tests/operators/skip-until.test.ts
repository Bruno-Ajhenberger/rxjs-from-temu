import { describe, expect, it, vi } from "vitest";
import { Observable, skipUntil } from "../../index";

describe("Observable piped with skip until operator", () => {
  it("should start emiting after predicate match", () => {
    const observable = new Observable<string>();
    const next = vi.fn();

    observable.pipe(skipUntil((value) => value.length > 3)).subscribe(next);
    observable.next("aaa");
    observable.next("test 2");

    expect(next).not.toHaveBeenCalledWith("aaa");
    expect(next).toHaveBeenCalledWith("test 2");
  });
});

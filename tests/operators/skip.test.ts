import { describe, expect, it, vi } from "vitest";
import { Observable, skip } from "../../index";

describe("Observable piped with skip operator", () => {
  it("should start emiting after x number of emits", () => {
    const observable = new Observable<string>();
    const next = vi.fn();

    observable.pipe(skip(1)).subscribe(next);
    observable.next("test 1");
    observable.next("test 2");

    expect(next).not.toHaveBeenCalledWith("test 1");
    expect(next).toHaveBeenCalledWith("test 2");
  });
});

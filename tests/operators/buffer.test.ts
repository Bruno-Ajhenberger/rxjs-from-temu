import { describe, it, vi, expect } from "vitest";
import { Observable } from "../../src/observables/observable";
import { buffer } from "../../src/operators/buffer";

describe("Observable piped with buffer operator", () => {
  it("should emit last x values as array", () => {
    const observable = new Observable<string>();
    const next = vi.fn();

    observable.pipe(buffer(2)).subscribe(next);
    observable.next("test 1");
    observable.next("test 2");
    observable.next("test 3");

    expect(next).toHaveBeenCalledWith(["test 1", "test 2"]);
    expect(next).not.toHaveBeenCalledWith(["test 3"]);
    expect(next).not.toHaveBeenCalledWith("test 3");
  });
});

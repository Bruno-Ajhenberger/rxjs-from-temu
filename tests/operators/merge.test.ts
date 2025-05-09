import { describe, it, vi, expect } from "vitest";
import { Observable } from "../../src/observables/observable";
import { merge } from "../../src/operators/merge";

describe("Observable piped with merge operator", () => {
  it("should start emiting after x number of emits", () => {
    const observableA = new Observable<string>();
    const observableB = new Observable<string>();
    const next = vi.fn();

    observableA.pipe(merge(observableB)).subscribe(next);
    observableA.next("test 1");
    observableB.next("test 2");

    expect(next).toHaveBeenCalledWith("test 1");
    expect(next).toHaveBeenCalledWith("test 2");
  });
});

import { describe, expect, it, vi } from "vitest";
import { BehaviorSubject } from "../../src/subjects/behavior-subject";

describe("Behavior subject", () => {
  it("should emit values to subscribers immediately after subscribing", () => {
    const subject = new BehaviorSubject<string>("test");
    const nextA = vi.fn();
    const nextB = vi.fn();

    subject.subscribe(nextA);
    subject.next("test 1");
    subject.subscribe(nextB);

    expect(nextA).toHaveBeenCalledTimes(2);
    expect(nextA).toHaveBeenCalledWith("test");
    expect(nextA).toHaveBeenCalledWith("test 1");
    expect(nextB).toHaveBeenCalledWith("test 1");
  });
});

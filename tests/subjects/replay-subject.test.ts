import { describe, expect, it, vi } from "vitest";
import { ReplaySubject } from "../../src/subjects/replay-subject";

describe("Replay subject", () => {
  it("should emit x number of values to subscribers immediately after subscribing", () => {
    const subject = new ReplaySubject<string>(3);
    const next = vi.fn();

    subject.next("test 1");
    subject.next("test 2");
    subject.next("test 3");
    subject.subscribe(next);

    expect(next).toHaveBeenCalledTimes(3);
    expect(next).toHaveBeenCalledWith("test 1");
    expect(next).toHaveBeenCalledWith("test 2");
    expect(next).toHaveBeenCalledWith("test 3");
  });
});

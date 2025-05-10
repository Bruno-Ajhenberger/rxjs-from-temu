import { describe, expect, it, vi } from "vitest";
import { Subject } from "../../src/subjects/subject";

describe("Subject", () => {
  it("should emit values to subscribers", () => {
    const subject = new Subject<string>();
    const nextA = vi.fn();
    const nextB = vi.fn();

    subject.subscribe(nextA);
    subject.subscribe(nextB);
    subject.next("test 1");
    subject.next("test 2");

    expect(nextA).toHaveBeenCalledTimes(2);
    expect(nextB).toHaveBeenCalledTimes(2);
    expect(nextA).toHaveBeenCalledWith("test 1");
    expect(nextA).toHaveBeenCalledWith("test 2");
    expect(nextB).toHaveBeenCalledWith("test 1");
    expect(nextB).toHaveBeenCalledWith("test 2");
  });

  it("should call error", () => {
    const subject = new Subject<string>();
    const errorA = vi.fn();
    const errorB = vi.fn();

    subject.subscribe(undefined, errorA);
    subject.subscribe(undefined, errorB);
    subject.error("error test");

    expect(errorA).toHaveBeenCalled();
    expect(errorA).toHaveBeenCalledWith("error test");
    expect(errorB).toHaveBeenCalled();
    expect(errorB).toHaveBeenCalledWith("error test");
  });

  it("should call complete", () => {
    const subject = new Subject<string>();
    const completeA = vi.fn();
    const completeB = vi.fn();

    subject.subscribe(undefined, undefined, completeA);
    subject.subscribe(undefined, undefined, completeB);
    subject.complete();

    expect(completeA).toHaveBeenCalled();
    expect(completeB).toHaveBeenCalled();
  });

  it("should not emit after complete", () => {
    const subject = new Subject<string>();
    const next = vi.fn();

    subject.subscribe(next);
    subject.complete();
    subject.next("test");

    expect(next).not.toHaveBeenCalled();
  });
});

import { Subscription } from "../src/subscription/Subscription";
import { Observable } from "./../src/observables/observable";
import { describe, expect, it, vi } from "vitest";

describe("Subscription", () => {
  it("should call unsubscribeRef when unsubsribed", () => {
    const unsubscribeRef = vi.fn();
    const subscription = new Subscription(unsubscribeRef);

    subscription.unsubscribe();

    expect(unsubscribeRef).toHaveBeenCalled();
  });

  it("should add new subscription to subscription list", () => {
    const subscription = new Subscription();

    subscription.add(new Subscription());

    expect(subscription.activeSubscriptionCount).toBe(1);
  });

  it("should unsubscribe added subscriptions", () => {
    const unsubscribeRefA = vi.fn();
    const unsubscribeRefB = vi.fn();
    const subscription = new Subscription();

    subscription.add(new Subscription(unsubscribeRefA));
    subscription.add(new Subscription(unsubscribeRefB));

    subscription.unsubscribe();

    expect(unsubscribeRefA).toHaveBeenCalled();
    expect(unsubscribeRefB).toHaveBeenCalled();
  });

  it("should clear subscription list after unsubscribe", () => {
    const unsubscribeRefA = vi.fn();
    const unsubscribeRefB = vi.fn();
    const subscription = new Subscription();

    subscription.add(new Subscription(unsubscribeRefA));
    subscription.add(new Subscription(unsubscribeRefB));

    subscription.unsubscribe();
    expect(subscription.activeSubscriptionCount).toBe(0);
  });
});

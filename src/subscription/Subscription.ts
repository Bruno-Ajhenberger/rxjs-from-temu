export class Subscription {
  private subscriptions: Subscription[] = [];

  constructor(private unsubscribeRef?: () => void) {}

  add = (newSubscription: Subscription) => {
    this.subscriptions.push(newSubscription);
  };

  unsubscribe = () => {
    if (this.unsubscribeRef) {
      this.unsubscribeRef();
    }
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
  };

  get activeSubscriptionCount(): number {
    return this.subscriptions.length;
  }
}

export class SubscriptionClosedError extends Error {
  constructor(message = 'Subscription is closed') {
    super(message);
    this.name = 'SubscriptionClosedError';
  }
}

export class Observer<T> {
  constructor(
    public next?: (newValue: T) => void,
    public complete?: () => void,
    public error?: (error?: Error | string) => void
  ) {}
}

import { ICaretaker } from '../interfaces/caretaker';

export class SubjectHistoryCaretaker<T> implements ICaretaker<T> {
  private history: Array<T> = [];
  private historyMaxLength: number;

  constructor(historyMaxLength: number, startValue?: T) {
    this.historyMaxLength = historyMaxLength;
    if (startValue) {
      this.saveToHistory(startValue);
    }
  }

  saveToHistory(snapshot: T): void {
    if (this.history.length === this.historyMaxLength) {
      this.removeFirstSnapshotFromHistory();
    }
    this.history.push(snapshot);
  }

  getHistory(): Array<T> {
    return this.history;
  }

  private removeFirstSnapshotFromHistory(): void {
    this.history.shift();
  }
}

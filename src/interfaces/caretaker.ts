export interface ICaretaker<T> {
  saveToHistory: (snapshot: T) => void;
}

export interface IDataSource<T> {
  getData: () => T | null;
  setData: (value: T) => void;
}

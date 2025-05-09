import { IDataSource } from '../interfaces/data-source';

export class DataSource<T> implements IDataSource<T> {
  private data!: T;

  getData(): T {
    return this.data;
  }

  setData(data: T): void {
    this.data = data;
  }
}

export interface PersistFrontEndData {

  addData(dataName: string, data: string): void;

  clearAll(): void;

  clearOne(dataName: string): void;

  getData(dataName: string): string|null;
}
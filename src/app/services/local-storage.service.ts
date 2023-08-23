import { Injectable } from '@angular/core';
import { PersistFrontEndData } from '../models/persist-front-end-data';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements PersistFrontEndData {

  constructor() { }

  addData(dataName: string, data: string) {
    localStorage.setItem(dataName, data);
  }

  clearAll() {
    localStorage.clear();
  }

  clearOne(dataName: string) {
    localStorage.removeItem(dataName);
  }

  getData(dataName: string): string|null {
    return localStorage.getItem(dataName)
  }
}

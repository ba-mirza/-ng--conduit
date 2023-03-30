import {Injectable} from '@angular/core';

@Injectable()
export class PersistanceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.log('Error saving to localStorage', err);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      console.log('Error getting data from localStorage', err);
      return null;
    }
  }
}

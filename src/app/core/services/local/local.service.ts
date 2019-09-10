import {Injectable} from '@angular/core';

@Injectable()
export class LocalService implements Storage {
  constructor() {
  }

  get length(): number {
    return localStorage.length;
  }

  clear(): void {
    localStorage.clear();
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setItem(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  [key: string]: any;

  [index: number]: string;

}

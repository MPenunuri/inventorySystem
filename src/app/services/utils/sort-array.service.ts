import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortArrayService {
  sortDirection: { [K in string]?: boolean } = {};

  constructor() {}

  sort<T>(array: T[], column: keyof T | string): T[] {
    if (this.sortDirection[column as string] === undefined) {
      this.sortDirection[column as string] = true;
    } else {
      this.sortDirection[column as string] =
        !this.sortDirection[column as string];
    }

    const isAscending = this.sortDirection[column as string];

    return array.sort((a, b) => {
      const aValue = this.getValueByPath(a, column as string);
      const bValue = this.getValueByPath(b, column as string);

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return isAscending ? 1 : -1;
      if (bValue === null) return isAscending ? -1 : 1;

      if (aValue < bValue) {
        return isAscending ? -1 : 1;
      }
      if (aValue > bValue) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });
  }

  private getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => (o ? o[p] : undefined), obj);
  }
}

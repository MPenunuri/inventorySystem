import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortArrayService {
  sortDirection: { [K in string]?: boolean } = {};

  constructor() {}

  sort<T>(array: T[], column: keyof T): T[] {
    if (this.sortDirection[column as string] === undefined) {
      this.sortDirection[column as string] = true;
    } else {
      this.sortDirection[column as string] =
        !this.sortDirection[column as string];
    }

    const isAscending = this.sortDirection[column as string];

    return array.sort((a, b) => {
      if (a[column] < b[column]) {
        return isAscending ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });
  }
}

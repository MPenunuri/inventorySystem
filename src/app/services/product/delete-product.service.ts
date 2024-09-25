import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteProductService {
  constructor(private http: HttpClient) {}

  deleteProductById(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/product/' + id);
  }
}

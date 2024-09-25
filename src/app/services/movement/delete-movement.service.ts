import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteMovementService {
  constructor(private http: HttpClient) {}

  deleteMovement(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/movement/' + id);
  }
}

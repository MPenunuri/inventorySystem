import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  registeredCategories: number;
  registeredSubcategories: number;
  registeredProducts: number;
  registeredMovements: number;
  registeredLocations: number;
  registeredStocks: number;
  registeredSuppliers: number;
  registeredProductSupplierRelations: number;
  registeredCurrencies: number;
}

@Component({
  selector: 'app-quotas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotas.component.html',
  styleUrl: './quotas.component.scss',
})
export class QuotasComponent {
  data?: UserData;
  constructor(private http: HttpClient) {}

  getData(): Observable<UserData> {
    return this.http.get<UserData>('/api/secure/quotas');
  }

  ngOnInit() {
    this.getData().subscribe({
      next: (info) => {
        this.data = info;
      },
    });
  }
}

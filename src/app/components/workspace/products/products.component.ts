import { Component, OnInit } from '@angular/core';
import { GetProductService } from '../../../services/product/get-product.service';
import { StandardProductI } from '../../../models/product/standard-product';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, AddProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products?: StandardProductI[];
  sortDirection: { [key: string]: boolean | undefined } = {};
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(private getService: GetProductService) {}

  setProducts() {
    this.getService.getAllProducts().subscribe({
      next: (data: StandardProductI[]) => {
        this.products = data;
        this.sort('productName');
      },
    });
  }

  ngOnInit(): void {
    this.setProducts();
  }
  sort(column: keyof StandardProductI) {
    if (this.sortDirection[column] === undefined) {
      this.sortDirection[column] = true;
    } else {
      this.sortDirection[column] = !this.sortDirection[column];
    }
    this.products = this.products?.sort((a, b) => {
      const isAscending = this.sortDirection[column];
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

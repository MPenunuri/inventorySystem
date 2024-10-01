import { Component, OnInit } from '@angular/core';
import { GetProductService } from '../../../services/product/get-product.service';
import { StandardProductI } from '../../../models/product/standard-product';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { SortArrayService } from '../../../services/utils/sort-array.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, AddProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products?: StandardProductI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    private getService: GetProductService,
    public sortService: SortArrayService
  ) {}

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
    if (this.products !== undefined) {
      this.products = this.sortService.sort(this.products, column);
    }
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movement-icon',
  standalone: true,
  imports: [],
  templateUrl: './movement-icon.component.html',
  styleUrl: './movement-icon.component.scss',
})
export class MovementIconComponent {
  @Input() productId?: number;
  @Input() productName?: string;
  @Input() name?: string;
  srcIcon?: string;
  url?: string;

  constructor(private router: Router) {}

  onClick() {
    if (this.url) {
      this.router.navigate([this.url]);
    }
  }

  ngOnInit() {
    if (this.name && this.productId && this.productName) {
      switch (this.name) {
        case 'Acquisitions':
          this.srcIcon = 'assets/shopping-cart.png';
          this.url =
            '/workspace/movement/product/acquisitions/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Productions':
          this.srcIcon = 'assets/factory.png';
          this.url =
            '/workspace/movement/product/productions/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Customer returns':
          this.srcIcon = 'assets/returning-customer.png';
          this.url =
            '/workspace/movement/product/customer-returns/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Entry adjustments':
          this.srcIcon = 'assets/login.png';
          this.url =
            '/workspace/movement/product/entry-adjustments/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Sales':
          this.srcIcon = 'assets/sale-tag.png';
          this.url =
            '/workspace/movement/product/sales/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Internal consumptions':
          this.srcIcon = 'assets/internal-link.png';
          this.url =
            '/workspace/movement/product/internal-consumptions/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Supplier returns':
          this.srcIcon = 'assets/packages.png';
          this.url =
            '/workspace/movement/product/supplier-returns/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Output adjustments':
          this.srcIcon = 'assets/packages.png';
          this.url =
            '/workspace/movement/product/output-adjustments/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Transfers':
          this.srcIcon = 'assets/transfer.png';
          this.url =
            '/workspace/movement/product/transfers/' +
            this.productId +
            '/' +
            this.productName;
          break;
        default:
          this.srcIcon = '';
          this.url = '';
          break;
      }
    }
  }
}

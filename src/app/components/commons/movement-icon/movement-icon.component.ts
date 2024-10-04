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
        case 'Acquisition':
          this.srcIcon = 'assets/shopping-cart.png';
          this.url =
            '/workspace/movement/add-acquisition/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Production':
          this.srcIcon = 'assets/factory.png';
          this.url =
            '/workspace/movement/add-production/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Customer return':
          this.srcIcon = 'assets/returning-customer.png';
          this.url =
            '/workspace/movement/add-customer-return/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Entry adjustment':
          this.srcIcon = 'assets/login.png';
          this.url =
            '/workspace/movement/add-entry-adjustment/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Sale':
          this.srcIcon = 'assets/sale-tag.png';
          this.url =
            '/workspace/movement/add-sale/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Internal consumption':
          this.srcIcon = 'assets/internal-link.png';
          this.url =
            '/workspace/movement/add-internal-consumption/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Supplier return':
          this.srcIcon = 'assets/packages.png';
          this.url =
            '/workspace/movement/add-supplier-return/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Output adjustment':
          this.srcIcon = 'assets/packages.png';
          this.url =
            '/workspace/movement/output-adjustment/' +
            this.productId +
            '/' +
            this.productName;
          break;
        case 'Transfer':
          this.srcIcon = 'assets/transfer.png';
          this.url =
            '/workspace/movement/add-transfer/' +
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

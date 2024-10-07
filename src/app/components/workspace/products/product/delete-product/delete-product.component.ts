import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DeleteProductService } from '../../../../../services/product/delete-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss',
})
export class DeleteProductComponent {
  @Input() productId?: number;
  isConfirmButtonEnabled = false;
  isDeleteInProgress = false;

  constructor(private service: DeleteProductService, private router: Router) {}

  toggleDeleteOperation() {
    if (this.isDeleteInProgress) {
      this.isConfirmButtonEnabled = false;
    } else {
      this.isConfirmButtonEnabled = true;
    }
    this.isDeleteInProgress = !this.isDeleteInProgress;
  }

  confirmDeletion() {
    if (this.productId) {
      this.service.deleteProductById(this.productId).subscribe({
        next: () => {
          this.router.navigate(['workspace/products']);
        },
        error: () => {
          alert('Something went wrong');
        },
      });
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../../commons/button/button.component';
import { MovementIconComponent } from '../../../../commons/movement-icon/movement-icon.component';
import { InventoryProductI } from '../../../../../models/product/inventory-product';

@Component({
  selector: 'app-add-movement',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MovementIconComponent],
  templateUrl: './add-movement.component.html',
  styleUrl: './add-movement.component.scss',
})
export class AddMovementComponent {
  @Input() product?: InventoryProductI;
  open: boolean;

  constructor() {
    this.open = false;
  }

  toggleOpen() {
    this.open = !this.open;
  }
}

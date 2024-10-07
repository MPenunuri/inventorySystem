import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../../commons/button/button.component';
import { MovementIconComponent } from '../../../../commons/movement-icon/movement-icon.component';
import { InventoryProductI } from '../../../../../models/product/inventory-product';

@Component({
  selector: 'app-manage-inventory',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MovementIconComponent],
  templateUrl: './manage-inventory.component.html',
  styleUrl: './manage-inventory.component.scss',
})
export class ManageInventoryComponent {
  @Input() product?: InventoryProductI;
  open: boolean;

  constructor() {
    this.open = false;
  }

  toggleOpen() {
    this.open = !this.open;
  }
}

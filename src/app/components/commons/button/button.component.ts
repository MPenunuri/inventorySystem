import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() name: string = '';
  @Input() className: string = 'regular';
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  handleClick() {
    this.clicked.emit();
  }
}

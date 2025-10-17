import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-item',
  imports: [NgClass],
  templateUrl: './dropdown-item.component.html',
})
export class DropdownItemComponent {
  @Input() to?: string;
  @Input() baseClassName =
    'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900';
  @Input() className = '';
  @Output() itemClick = new EventEmitter<void>();
  @Output() click = new EventEmitter<void>();

  get combinedClasses(): string {
    return `${this.baseClassName} ${this.className}`.trim();
  }

  handleClick(event: Event) {
    event.preventDefault();
    this.click.emit();
    this.itemClick.emit();
  }
}

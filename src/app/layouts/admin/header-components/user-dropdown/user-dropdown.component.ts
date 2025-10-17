import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DropdownItemTwoComponent } from '../dropdown/dropdown-item/dropdown-item-two.component';

@Component({
  selector: 'app-user-dropdown',
  imports: [CommonModule, DropdownComponent, DropdownItemTwoComponent],
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent {
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}

import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  imports: [NgClass],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Input() label?: string;
  @Input() checked = false;
  @Input() className = '';
  @Input() control!: FormControl;
  @Input() id?: string;
  @Input() disabled = false;
  
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checkedChange.emit(input.checked);
  }
}

import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  imports: [NgClass],
  templateUrl: './label.component.html',
})
export class LabelComponent {
  @Input() for: string = '';
  @Input() className = '';
}

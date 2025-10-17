import { Component, Input } from '@angular/core';
import { ControlErrorsComponent } from '../../control-errors/control-errors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  imports: [CommonModule, ReactiveFormsModule, ControlErrorsComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input({ required: true }) labelSelectId!: string;
  @Input({ required: true }) labelContent!: string;
  @Input({ required: true }) selectTitle!: string;
  @Input({ required: true }) controlName!: any;
  @Input({ required: true }) selects!: { id: string; catName: string }[];
}

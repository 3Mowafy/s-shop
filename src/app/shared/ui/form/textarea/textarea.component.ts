import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorsComponent } from '../../control-errors/control-errors.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textarea',
  imports: [CommonModule, ReactiveFormsModule, ControlErrorsComponent],
  templateUrl: './textarea.component.html',
})
export class TextareaComponent {
  @Input({ required: true }) labelTextareaId!: string;
  @Input({ required: true }) labelContent!: string;
  @Input({ required: true }) textareaTitle!: string;
  @Input({ required: true }) placeHolder!: string;
  @Input({ required: true }) controlName!: any;
}

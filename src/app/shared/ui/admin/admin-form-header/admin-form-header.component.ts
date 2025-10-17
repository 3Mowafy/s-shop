import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-form-header',
  imports: [],
  templateUrl: './admin-form-header.component.html',
  styleUrl: './admin-form-header.component.scss'
})
export class AdminFormHeaderComponent {
  @Input({required: true}) titleFormHeaderName!: string
}

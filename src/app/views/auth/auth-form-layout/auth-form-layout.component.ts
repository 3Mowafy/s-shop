import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-form-layout',
  imports: [RouterLink],
  templateUrl: './auth-form-layout.component.html',
})
export class AuthFormLayoutComponent {
  @Input() title!: string;
  @Input() promptText!: string;
  @Input() divider: boolean = true;
}

import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-prompt',
  imports: [RouterLink],
  templateUrl: './auth-prompt.component.html',
  styleUrl: './auth-prompt.component.scss',
})
export class AuthPromptComponent {
  @Input({ required: true }) route!: string;
  @Input({ required: true }) prompt!: string;
  @Input({ required: true }) spanContent!: string;
}

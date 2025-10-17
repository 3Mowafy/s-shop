import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from '@animations';

import { AuthService } from '@services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  animations: [routeAnimation],
})
export class AppComponent {
  constructor(private _authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this._authService.accessToken.set(token);
      this._authService.ensureFreshTokenBeforeRequest().subscribe({
        complete: () => this._authService.loadProfile().subscribe(),
      });
    }
  }
}

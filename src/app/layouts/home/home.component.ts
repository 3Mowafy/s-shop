import { Component, effect } from '@angular/core';
import { ThemeToggleComponent } from 'shared/ui/layout/theme-toggle.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@services';
import { IUser } from '@interfaces/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ThemeToggleComponent, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  user;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.user = this._authService.user;
  }

  logout() {
    this._router.navigate(['auth'], {
      relativeTo: this._activatedRoute,
    });
    this._authService.logout().subscribe({});
  }
}

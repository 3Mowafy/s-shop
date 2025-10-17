import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    public router: Router,
    private _toastr: ToastrService
  ) {}

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 500);

        this._toastr.success(`${res.message}`, 'Logout');
      },
    });
  }
}

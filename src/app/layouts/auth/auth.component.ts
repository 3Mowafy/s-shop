import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routeAnimation } from '@animations';
import { GridShapeComponent } from '@ui';
import { ThemeToggleComponent } from 'shared/ui/layout/theme-toggle.component';

@Component({
  selector: 'app-auth',
  imports: [RouterModule, GridShapeComponent, ThemeToggleComponent],
  templateUrl: './auth.component.html',
  animations: [routeAnimation],
})
export class AuthComponent {}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header-components/header/header.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from 'shared/services/sidebar.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { routeAnimation } from '@animations';

@Component({
  selector: 'app-admin',
  imports: [
    RouterModule,
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    BackdropComponent,
  ],
  templateUrl: './admin.component.html',
  animations: [routeAnimation],
})
export class AdminComponent {
  readonly isExpanded$;
  readonly isHovered$;
  readonly isMobileOpen$;

  constructor(public sidebarService: SidebarService) {
    this.isExpanded$ = this.sidebarService.isExpanded$;
    this.isHovered$ = this.sidebarService.isHovered$;
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }

  get containerClasses() {
    return [
      'flex-1',
      'transition-all',
      'duration-300',
      'ease-in-out',
      this.isExpanded$ || this.isHovered$ ? 'xl:ml-[290px]' : 'xl:ml-[90px]',
      this.isMobileOpen$ ? 'ml-0' : '',
    ];
  }
}

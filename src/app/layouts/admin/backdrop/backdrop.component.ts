import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from 'shared/services/sidebar.service';

@Component({
  selector: 'app-backdrop',
  imports: [AsyncPipe],
  templateUrl: './backdrop.component.html',
})
export class BackdropComponent {
  readonly isMobileOpen$;

  constructor(private sidebarService: SidebarService) {
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }

  closeSidebar() {
    this.sidebarService.setMobileOpen(false);
  }
}

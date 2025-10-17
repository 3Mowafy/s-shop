import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarService } from 'shared/services/sidebar.service';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';
import { ThemeToggleComponent } from 'shared/ui/layout/theme-toggle.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ThemeToggleComponent, UserDropdownComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly isMobileOpen$;
  isApplicationMenuOpen = false;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(public sidebarService: SidebarService) {
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }

  handleToggle() {
    if (window.innerWidth >= 1280) {
      this.sidebarService.toggleExpanded();
    } else {
      this.sidebarService.toggleMobileOpen();
    }
  }

  toggleApplicationMenu() {
    this.isApplicationMenuOpen = !this.isApplicationMenuOpen;
  }

  ngAfterViewInit() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.searchInput?.nativeElement.focus();
    }
  };
}

import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.scss'
})
export class NavUserComponent {
  readonly _AuthService = inject(AuthService)

  isUserDropdownOpen = false;
  isThemeDropdownOpen = false;
  isDropdownOpen = false;
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  toggleThemeDropdown() {
    this.isThemeDropdownOpen = !this.isThemeDropdownOpen;
  }

  closeDropdowns(event: Event) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('#user-menu-button') &&
      !target.closest('#user-dropdown')
    ) {
      this.isUserDropdownOpen = false;
      this.isDropdownOpen = false;
    }
    
    if (
      !target.closest('#dropdownThemeButton') &&
      !target.closest('#dropdownTheme')
    ) {
      this.isThemeDropdownOpen = false;
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-admin.component.html',
  styleUrl: './nav-admin.component.scss',
})
export class NavAdminComponent implements OnInit {
  readonly _AuthService = inject(AuthService);

  isUserDropdownOpen = false;
  isThemeDropdownOpen = false;
  isDropdownOpen = false;

  username: string | null = null;
  userRole: string | null = null;

  private userSub!: Subscription;

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.userSub = this._AuthService.userData$.subscribe((data) => {
      this.userRole = data?.role ?? null;
    });
  }

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

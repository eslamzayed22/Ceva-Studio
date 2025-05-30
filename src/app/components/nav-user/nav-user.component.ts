import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [RouterLink, CartComponent, WishlistComponent],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.scss',
})
export class NavUserComponent implements OnInit {
  readonly _AuthService = inject(AuthService);
  private readonly _PLATFORM_ID= inject(PLATFORM_ID);

  isDarkMode = false;
  isCartOpen = false;
  isWishlistOpen = false;
  isUserDropdownOpen = false;
  isThemeDropdownOpen = false;
  isDropdownOpen = false;
  username: string | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.username = localStorage.getItem('username');
    }
  }

  setTheme(mode: 'light' | 'dark') {
    this.isDarkMode = mode === 'dark';
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('theme', mode);
    this.isThemeDropdownOpen = false; // اختياري: يغلق القائمة بعد الاختيار
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

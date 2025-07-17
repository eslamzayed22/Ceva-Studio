import { Component, inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [RouterLink, CartComponent, WishlistComponent],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.scss',
})
export class NavUserComponent implements OnInit, OnDestroy {
  readonly _AuthService = inject(AuthService);
  private readonly _UserService = inject(UserService);

  private readonly _PLATFORM_ID = inject(PLATFORM_ID);

  isDarkMode = false;
  isCartOpen = false;
  isWishlistOpen = false;
  isUserDropdownOpen = false;
  isThemeDropdownOpen = false;
  isDropdownOpen = false;

  username: string | null = null;

  getAllUserSub!: Subscription;

  ngOnInit(): void {
    this.getAllUserSub = this._UserService.getLogedUserData().subscribe({
      next: (res) => {
        // console.log(res);
        this.username = res.data.name;
      },
    });
  }

  ngOnDestroy(): void {
    this.getAllUserSub?.unsubscribe();
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

  closeUserDropdown(): void {
    this.isUserDropdownOpen = false;
    this.isDropdownOpen = false;
  }

  closeDropdowns(event: Event): void {
    const target = event.target as HTMLElement;
    const clickedInsideUserDropdown =
      target.closest('#user-menu-button') || target.closest('#user-dropdown');
    const clickedInsideThemeDropdown =
      target.closest('#dropdownThemeButton') ||
      target.closest('#dropdownTheme');
    if (!clickedInsideUserDropdown) {
      this.isUserDropdownOpen = false;
      this.isDropdownOpen = false;
    }
    if (!clickedInsideThemeDropdown) {
      this.isThemeDropdownOpen = false;
    }
  }
}

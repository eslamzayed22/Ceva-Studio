import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { WishlistComponent } from "../wishlist/wishlist.component";

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [RouterLink, CartComponent, WishlistComponent],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.scss'
})
export class NavUserComponent implements OnInit {
  readonly _AuthService = inject(AuthService)

  isUserDropdownOpen = false;
  isThemeDropdownOpen = false;
  isDropdownOpen = false;
  username: string | null = null;

ngOnInit() {
  this.username = localStorage.getItem('username');
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

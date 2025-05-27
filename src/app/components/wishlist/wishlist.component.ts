import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  isOpen = false;

  wishlistItems = [
    { id: 1, name: 'iPhone 15', price: 999, quantity: 1, image: 'https://via.placeholder.com/80' },
    { id: 2, name: 'AirPods Pro', price: 199, quantity: 2, image: 'https://via.placeholder.com/80' },
  ];

  get subtotal(): number {
    return this.wishlistItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  openWishlist() {
    this.isOpen = true;
  }

  closeWishlist() {
    this.isOpen = false;
  }

  removeItem(item: any) {
    this.wishlistItems = this.wishlistItems.filter(i => i.id !== item.id);
  }
}

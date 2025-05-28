import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  animations: [
    trigger('slideFadeRight', [
      transition(':enter', [
        style({ transform: 'translatex(150px)', opacity: 0 }),
        animate(
          '0.5s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class WishlistComponent {
  isOpen = true;
  @Output() close = new EventEmitter<void>();

  wishlistItems = [
    {
      id: 1,
      name: 'iPhone 15',
      price: 999,
      quantity: 1,
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      name: 'AirPods Pro',
      price: 199,
      quantity: 2,
      image: 'https://via.placeholder.com/80',
    },
  ];

  get subtotal(): number {
    return this.wishlistItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  removeItem(item: any) {
    this.wishlistItems = this.wishlistItems.filter((i) => i.id !== item.id);
  }

  closeWishlist() {
    this.close.emit();
  }
}

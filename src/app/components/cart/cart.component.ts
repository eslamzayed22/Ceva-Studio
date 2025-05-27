import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  isOpen = false;

  cartItems = [
    { id: 1, name: 'iPhone 15', price: 999, quantity: 1, image: 'https://via.placeholder.com/80' },
    { id: 2, name: 'AirPods Pro', price: 199, quantity: 2, image: 'https://via.placeholder.com/80' },
  ];

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  openCart() {
    this.isOpen = true;
  }

  closeCart() {
    this.isOpen = false;
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }
}

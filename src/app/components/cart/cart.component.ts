import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  inject,
  WritableSignal,
  signal,
} from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [UpperCasePipe, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  animations: [
    trigger('slideFadeRight', [
      transition(':enter', [
        style({ transform: 'translateX(150px)', opacity: 0 }),
        animate(
          '0.5s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);

  isOpen = true;
  @Output() close = new EventEmitter<void>();

  cartDetails: WritableSignal<Icart> = signal<Icart>({} as Icart);
  hasError = signal(false);
  hasItems = signal(false);

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        this.cartDetails.set(res.data);
        this.hasError.set(false); // reset error
        this.hasItems.set(true); 
      },
      error: (err) => {
        if (err.status === 404) {
          // لا يوجد كارت للمستخدم
          this.hasError.set(true);
        }
      },
    });
  }

  updateCount(id: string, quantity: number): void {
    this._CartService.updateProductQuantity(id, quantity).subscribe({
      next: (res) => {
        this.cartDetails.set(res.data);
        console.log(res);
        this._CartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  removeItemFromCart(id: string): void {
    this._CartService.deleteSpecificItem(id).subscribe({
      next: (res) => {
        this.cartDetails.set(res.data);
        console.log(res);
        this._CartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  clearUserBasket(): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set({} as Icart);
        this.hasError.set(true); // reset error
        this.hasItems.set(false);
        this._CartService.cartNumber.set(0);
      },
    });
  }

  // Call this from template to emit close event
  closeCart() {
    this.close.emit();
  }
}

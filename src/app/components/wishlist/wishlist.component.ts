import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  Output,
  EventEmitter,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
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
export class WishlistComponent {
  isOpen = true;
  @Output() close = new EventEmitter<void>();

  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);

  wishlistDetails: WritableSignal<Iwishlist[]> = signal([]);
  private getAllWishlistItem!: Subscription;

  selectedSizes: { [productId: string]: string } = {};
  selectedSize: string = '';
  showWarning: { [productId: string]: boolean } = {};
  

  toggleSize(productId: string, size: string) {
    if (this.selectedSizes[productId] === size) {
      delete this.selectedSizes[productId]; // إلغاء التحديد
      this.selectedSize = ''; // تحديث العرض أيضاً
    } else {
      this.selectedSizes[productId] = size;
      this.selectedSize = size;
    }
    this.showWarning[productId] = false;
  }

  ngOnInit(): void {
    this.getAllWishlistItems();
  }

  ngOnDestroy(): void {
    if (this.getAllWishlistItem) {
      this.getAllWishlistItem.unsubscribe();
    }
  }
  getAllWishlistItems(): void {
    this.getAllWishlistItem = this._WishlistService
      .getProductsWishlist()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.wishlistDetails.set(res.data);
        },
      });
  }

  removeWishItem(id: string): void {
    this._WishlistService.deleteSpecificItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllWishlistItems();
        this._WishlistService.wishNumber.set(res.data.length);
      },
    });
  }
  addToBasket(productId: string): void {
    const selectedSize = this.selectedSizes[productId];

    if (!selectedSize) {
      this.showWarning[productId] = true;
      return;
    }
    this._CartService.addToCart({ productId, size: selectedSize }).subscribe({
      next: (res) => {
        // console.log(res);
        this._CartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }
  closeWishlist() {
    this.close.emit();
  }
}

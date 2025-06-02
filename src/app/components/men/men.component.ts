import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './men.component.html',
  styleUrl: './men.component.scss',
})
export class MenComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  selectedSize: string = '';
  selectedSizes: { [productId: string]: string } = {};
  showWarning: { [productId: string]: boolean } = {};

  productList: WritableSignal<IProduct[]> = signal([]);
  wishlistData: WritableSignal<string[]> = signal([]);

  getAllProductSub!: Subscription;

  ngOnInit(): void {
    this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data);
      },
    });
  }

  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe();
  }

  addToBasket(productId: string) {
    const selectedSize = this.selectedSizes[productId];

    if (!selectedSize) {
      this.showWarning[productId] = true;
      return;
    }

    this._CartService
      .addToCart({
        productId,
        size: selectedSize,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this._CartService.cartNumber.set(res.numOfCartItems);
        },
      });

    this.showWarning[productId] = false;
  }

  addToWishlist(id: string): void {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.wishlistData.set(res.data);
        this._WishlistService.wishNumber.set(res.data.length);
      },
    });
  }

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
}

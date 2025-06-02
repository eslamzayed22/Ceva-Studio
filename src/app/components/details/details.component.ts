import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, NgStyle } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgStyle, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);

  // private readonly _NgxSpinnerService = inject(NgxSpinnerService);

  selectedColor: string = '';
  selectedSize: string = '';
  selectedSizes: { [productId: string]: string } = {};
  showWarning: { [productId: string]: boolean } = {};

  detalisProduct: IProduct = {} as IProduct;
  wishlistData: WritableSignal<string[]> = signal([]);

  selectedImage: string | null = null;

  private getDetailsProductSub = new Subscription();

  ngOnInit(): void {
    // this._NgxSpinnerService.show()
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');

        this.getDetailsProductSub = this._ProductsService
          .getSpecificProduct(idProduct)
          .subscribe({
            next: (res) => {
              this.detalisProduct = res.data;
              // this._NgxSpinnerService.hide()
              // console.log(res.data);
            },
          });
      },
    });
  }

  ngOnDestroy(): void {
    this.getDetailsProductSub.unsubscribe();
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
        color: this.selectedColor, // ✅ ضفنا اللون هنا
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

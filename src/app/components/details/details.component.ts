import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, NgStyle } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';

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

  // private readonly _NgxSpinnerService = inject(NgxSpinnerService);

  selectedColor: string = '';
  selectedSize: string = '';

  detalisProduct: IProduct = {} as IProduct;
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
        // this._ToastrService.success(res.message);
      },
    });

  this.showWarning[productId] = false;
  }

  selectedSizes: { [productId: string]: string } = {};
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
}

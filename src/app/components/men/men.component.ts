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

  productList: WritableSignal<IProduct[]> = signal([]);

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
          // this._ToastrService.success(res.message);
        },
      });

    this.showWarning[productId] = false;
  }

  selectedSizes: { [productId: string]: string } = {};
  showWarning: { [productId: string]: boolean } = {};

  selectSize(productId: string, size: string) {
    this.selectedSizes[productId] = size;
    this.showWarning[productId] = false;
  }
}

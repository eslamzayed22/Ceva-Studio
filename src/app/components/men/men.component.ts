import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './men.component.html',
  styleUrl: './men.component.scss',
})
export class MenComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);

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

  sizes = ['S', 'M', 'L', 'XL'];
  selectedSizes: { [productId: string]: string } = {};
  showWarning: { [productId: string]: boolean } = {};

  selectSize(productId: string, size: string) {
    this.selectedSizes[productId] = size;
    this.showWarning[productId] = false;
  }

  addToBasket(productId: string) {
    const selectedSize = this.selectedSizes[productId];
    if (!selectedSize) {
      this.showWarning[productId] = true;
      return;
    }

    console.log(`Product ${productId} added with size ${selectedSize}`);
    this.showWarning[productId] = false;
  }
}

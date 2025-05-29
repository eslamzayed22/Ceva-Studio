import { Component, inject } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe, NgStyle],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService);
  // private readonly _NgxSpinnerService = inject(NgxSpinnerService);

  selectedColor: string = '';
  selectedSize: string = '';

  detalisProduct: IProduct = {} as IProduct;
  selectedImage: string | null = null;


  ngOnInit(): void {
    // this._NgxSpinnerService.show()
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');

        this._ProductsService.getSpecificProduct(idProduct).subscribe({
          next: (res) => {
            this.detalisProduct = res.data;
            // this._NgxSpinnerService.hide()
            // console.log(res.data);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }


  selectedSizes: { [productId: string]: string } = {};
  showWarning: { [productId: string]: boolean } = {};

  selectSize(productId: string, size: string) {
  this.selectedSizes[productId] = size;
  this.selectedSize = size; // تحديث المتغير العام للعرض
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

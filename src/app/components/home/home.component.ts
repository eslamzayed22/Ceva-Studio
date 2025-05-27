import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly _ProductsService = inject (ProductsService);
  
    productList : WritableSignal<IProduct[]> = signal([])
  
    getAllProductSub!: Subscription;
  
    ngOnInit(): void {
      this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
        next: (res) => {
          console.log(res);
          
          this.productList.set( res.data);
        }
      });
    }
}

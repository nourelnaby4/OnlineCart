import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
  providers:[MessageService]
})
export class ProductdetailsComponent implements OnInit {
  ProductId: any;
  ProductDetails: any;
  constructor(private _activatedRoute: ActivatedRoute, private _productService: ProductService,
    private _cartService:CartService, private messageService: MessageService) { }
  ngOnInit(): void {
    //to get id of product from url
    this._activatedRoute.paramMap.subscribe({ next: (params) => this.ProductId = params.get('id') });
    console.log(this.ProductId);
    this._productService.getProductDetails(this.ProductId).subscribe({
      next: (response) => { this.ProductDetails = response.data }
    });
  }

  addToCart(productId:string){
    this._cartService.addCart(productId).subscribe({
      next:(reponse)=>console.log('add to cart'),
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'error to cart' })
        console.log('error in add to cart')
      },
      complete:()=>{
        this._cartService.cartItemCount.next(this._cartService.cartItemCount.getValue()+1),
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'add to cart' });

      }
    })
  }





  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }

    }
  }
}

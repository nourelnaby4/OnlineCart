import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Message, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [MessageService],
})
export class ProductsComponent implements OnInit {

  Products: any[]=[];
  messages1 !: Message[];


  Categories:any[]=[];
 cartCount: number = 0;
 constructor(private _productService: ProductService,
   private _cartService: CartService, private toastr: ToastrService,
    private messageService: MessageService,private _route: ActivatedRoute) {
 }





 responsiveOptions: any[] | undefined;

 ngOnInit() {
  this._route.paramMap.subscribe({
    next: (para) => { this.getProductByCategoryId(para.get('id') || "") },
    error: (err) => console.log(err)

  });

  this.messages1 =[{severity: 'warn', summary: 'Waning', detail: 'there are no data yet!'}]

     this._productService.getProducts().subscribe((products) => {
         this.Products = products;
     });

     this.responsiveOptions = [
         {
             breakpoint: '1199px',
             numVisible: 1,
             numScroll: 1
         },
         {
             breakpoint: '991px',
             numVisible: 2,
             numScroll: 1
         },
         {
             breakpoint: '767px',
             numVisible: 1,
             numScroll: 1
         }
     ];
 }



 addCart(productId: string) {
   this._cartService.addCart(productId).subscribe({
     next: (reponse) => {
       console.log("add to cart")
     },
     error: (err) => {
       this.messageService.add({ severity: 'error', summary: 'error', detail: 'error to cart' })
         , console.log(err)
     },
     complete: () => {
       //this.toastr.success('Successfully', 'add to cart');
       this._cartService.cartItemCount.next(this._cartService.cartItemCount.getValue() + 1)
       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'add to cart' });
     }
   });
 };







  getProductByCategoryId(categoryId: string) {
    this._productService.getByCategoryId(categoryId).subscribe({
      next: (response) => {
        this.Products = response.data;
      }

    })

  }


}

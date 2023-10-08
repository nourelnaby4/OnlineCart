import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProductDTO } from 'src/app/interfaces/product-dto';
import { MessageService } from 'primeng/api';
import {CarouselModule} from 'primeng/carousel/carousel'
import { CategoriesService } from 'src/app/services/categories.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],

})
export class HomeComponent implements OnInit {
  yourData: any = 'Data from home component';
  search: string = '';

 Products: Product[] = [];
  private Wishlist: Product[] = [];
  productsDto: ProductDTO[] = [];
   Categories:any[]=[];
  cartCount: number = 0;
  constructor(private _productService: ProductService,
    private _cartService: CartService, private toastr: ToastrService,
    private _wishlistService: WishlistService,private categorytService: CategoriesService,
     private messageService: MessageService) {
  }





  responsiveOptions: any[] | undefined;

  ngOnInit() {

    this.getAllWishlist()
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



  getAllWishlist() {
    this._wishlistService.getAll().subscribe({
      next: (reponse) => {
        this.Wishlist = reponse.data
      },
      error: (err) => console.log(err),
      complete: () => this.getAllProducts()
    })
  }
  getAllProducts() {

    this._productService.getProducts().subscribe({
      next: (response) => {
        this.Products = response.data;

      }, error: (err) => console.log(err),
      complete: () => this.getProductDto()
    });
  }

  getProductDto() {
    this.productsDto = this.Products.map((s) => ({
      _id: s._id,
      title: s.title,
      imageCover: s.imageCover,
      category: s.category,
      price: s.price,
      ratingsAverage: s.ratingsAverage,
      description: s.description,
      quantity: s.quantity,
      isWishLsited: this.Wishlist.some((p) => p._id === s._id)
    }));
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



  addWishlist(productId: string) {
    this._wishlistService.add(productId).subscribe({
      next: (reponse) => {
        console.log("add to wishlist");
      },
      error: (err) => { this.toastr.error('fail', 'try again'), console.log(err) },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'add to whislist' });
        //this.getAllWishlist();
        this.updateProductDTO(productId)
      }
    });
  }

  deleteWishlist(productId: string) {
    this._wishlistService.delete(productId).subscribe({
      next: (reponse) => {
        console.log("delete from wishlist");
      },
      error: (err) => { this.toastr.error('fail', 'try again'), console.log(err) },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'delete from whislist' });
        //this.getAllWishlist();
        this.updateProductDTO(productId)
      }
    });
  }

getCategories(){
  this.categorytService.getAll().subscribe((Categories) => {
    this.Categories = Categories.data;
    this.Categories = this.Categories.filter(c => c.name !== "Women's Fashion");
    console.log(this.Categories)
});
}


  updateProductDTO(productItemId: string) {
    const index = this.productsDto.findIndex(c => c._id === productItemId);

    if (index !== -1) {
      const item = this.productsDto[index];
      const isWishListed = item.isWishLsited;
      this.productsDto[index].isWishLsited = !isWishListed;
      console.log(isWishListed);
    } else {
      console.log("Product not found");
    }
  }

}

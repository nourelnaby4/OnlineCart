import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService]
})
export class CartComponent {
  productId: string = '';
  productCart: any[] = []
  constructor(private _cartService: CartService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.getCartItem()
  }

  getCartItem() {
    this._cartService.getUserLogged().subscribe({
      next: (reponse) => {
        this.productCart = reponse.data.products,
          this._cartService.cartID.next(reponse.data._id)

      }
    })
  }
  deleteCartItem(cartItemId: string) {
    this._cartService.removeCartItem(cartItemId).subscribe({
      next: (reponse) => {
        this.productCart = reponse.data.products;
        console.log(reponse)
      },
      error: (err) => this.messageService.add({ severity: 'error', summary: 'error', detail: 'can not deleted' })
      ,
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'success deleted' });
        this._cartService.cartItemCount.next(this._cartService.cartItemCount.getValue() - 1)

      }
    })
  }

  updateCount(cartItemId: string, itemCount: number) {
    this._cartService.updateCartItemCount(cartItemId, itemCount).subscribe({
      next: (reponse) => {
        this.productCart = reponse.data.products;

        console.log(reponse)
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'error in updated' });
        console.log(err)
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'success updated items' });

      }
    });
  }
}

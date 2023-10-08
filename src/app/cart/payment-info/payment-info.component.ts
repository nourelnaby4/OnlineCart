import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent {

  constructor(private _cartService: CartService) { }
  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.min(5)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern('01[0125][0-9]{8}')]),
    city: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
  });

  goToPayment(shippingAddress: FormGroup) {
  let myRoot=  window.location.origin
let cartID=this._cartService.cartID.getValue();
    this._cartService.onlinePayment(shippingAddress.value,myRoot, cartID).subscribe(
      {
        next: (reponse:any) => {
          console.log(reponse.session.url)
          window.location.href=reponse.session.url;
        },
        error: (err) => console.log(err),
      }
    )
  }
}

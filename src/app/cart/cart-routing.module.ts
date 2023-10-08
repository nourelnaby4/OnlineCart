import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';

const routes: Routes = [{ path: '', redirectTo:'cart',pathMatch:'full'},
{ path: 'cart', component: CartComponent,title:'cart' },
{ path: 'payment', component: PaymentInfoComponent,title:'payment-imfo' },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }

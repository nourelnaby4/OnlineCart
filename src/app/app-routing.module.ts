import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './Guards/auth.guard';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',canActivate:[authGuard] ,component:HomeComponent,title:'home'},

  {path:'products/:id',canActivate:[authGuard],component:ProductsComponent,title:'products'},
  {path:'productdetails/:id',canActivate:[authGuard],component:ProductdetailsComponent,title:'productdetails'},
  {path:'categories',loadComponent:()=> import('./components/categories/categories.component').then(c=>c.CategoriesComponent),
   canActivate:[authGuard],title:'categories'},
  {path:'register',component:RegisterComponent,title:'register'},
  {path:'login',component:LoginComponent,title:'login'},
  {path:'notfound',component:NotfoundComponent,title:'notfound'},
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  {path:'wishlist',loadComponent:()=>import('./components/wishlist/wishlist.component').then(c=>c.WishlistComponent),
  canActivate:[authGuard],title:'wishlist'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/interfaces/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private _auth: AuthService, private _router: Router,private _cartService:CartService) {
  }
  isNavbarScrolled: boolean = false;


  onWindowScroll() {
    const offset = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isNavbarScrolled = offset > 50;
  }

  cartCount: number = 0;
  ngOnInit(): void {
    this._auth.UserData.subscribe({
      next: () => {
        this.isLogin = this._auth.UserData.getValue() != null ? true : false;
      }
    });

    this._cartService.cartItemCount.subscribe({
      next:(reponse)=> this.cartCount=reponse
    })

    this._cartService.getUserLogged().subscribe({
      next:(reponse)=> {
        this.cartCount=reponse.numOfCartItems

      },
      error:(err)=>console.log("error in get cart"),
      complete:()=>{
        this._cartService.cartItemCount.next(this.cartCount)
      }
    })


    // this._cartService.getUserLogged().subscribe({
    //   next: (reponse) => { this.cartCount = reponse.numOfCartItems,
    //   this._cartService.cartItemCount.next(this.cartCount),
    //   this.dataSharingService.sharedDataSubject = reponse.numOfCartItems ,
    //   this.cartCout=  this.dataSharingService.sharedDataSubject ;
    // },

    //   error: (err) => {this.toastr.error('fail', 'try again'),console.log(err),console.log('login befor')},

    // });


    // setTimeout(() => {
    //   this.logOut()
    // }, 10000);
  }

  logOut() {
    this.isLogin = false;
    console.log(`login is ${this.isLogin}  in logout`);
    localStorage.removeItem('userToken');
    this._auth.UserData.next(null);
    this._router.navigate(['./login']);
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/services/wishlist.service';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { Product } from 'src/app/interfaces/Product';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SlicetextPipe } from '../../pipes/slicetext.pipe'

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RatingModule,
    TagModule, TableModule, ButtonModule, FormsModule, SlicetextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  products!: Product[];

  constructor(private _wishlistService: WishlistService) { }

  ngOnInit() {
    this.getAllWishlist()
  }
  getAllWishlist() {
    this._wishlistService.getAll().subscribe((response) => (this.products = response.data));
  }
  getSeverity(quantity: number) {
    console.log(quantity)
    if (quantity > 50) { return 'success' }
    else if (50 > quantity && quantity > 10) { return 'warning' }
    else { return 'danger' }
  };




}

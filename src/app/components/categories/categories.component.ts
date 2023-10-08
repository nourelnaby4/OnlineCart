import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CategoriesService } from 'src/app/services/categories.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterModule],

  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = []
  constructor(private _categoriesService: CategoriesService) { }
  ngOnInit(): void {
      this._categoriesService.getAll().subscribe({
        next: (response) => { this.categories = response.data }
      })

  }


}

import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loader: boolean = false;
  constructor(private loaderService: LoaderService) { }
  ngOnInit(): void {
    this.loaderService.loader.subscribe({
      next: (res) => {
        this.loader = res
      }
    })
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { ProductDTO } from '../interfaces/product-dto';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: ProductDTO[],term:string): ProductDTO[] {
    return products.filter(x=>x.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
  }

}

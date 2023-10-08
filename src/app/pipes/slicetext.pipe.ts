import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slicetext',
  standalone:true
})
export class SlicetextPipe implements PipeTransform {

  transform(text: string): string {
    return text.split(' ').slice(0,2).join(' ');
  }


}

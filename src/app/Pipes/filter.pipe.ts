import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any = [], filterString: string) {
    if (filterString == '' || filterString == null) {
      return value;
    }

    const booksArray = []
    for (const Book of value) {
      if (Book.bookName.toLowerCase().includes(filterString.toLowerCase()) || Book.author.toLowerCase().includes(filterString.toLowerCase())) {
        booksArray.push(Book);
      }
    }
    return booksArray;
  }
}

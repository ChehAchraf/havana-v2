import { Component, EventEmitter, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-search-input',
  imports: [NgIcon],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {

  @Output() search = new EventEmitter<string>();

  onSearch(event: any) {
    const value = event.target.value;
    this.search.emit(value);
  }

}

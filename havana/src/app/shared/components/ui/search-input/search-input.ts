import {Component, inject} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import {TrackService} from '../../../../core/service/track.service';

@Component({
  selector: 'app-search-input',
  imports: [NgIcon],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {

    private trackService = inject(TrackService);

    onSearch(event: any) {
        const value = event.target.value;
        this.trackService.setSearchQuery(value);
    }

}

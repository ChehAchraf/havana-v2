import { Component } from '@angular/core';
import { SearchInput } from "../../shared/components/ui/search-input/search-input";
import { TrackList } from "./components/track-list/track-list";

@Component({
  selector: 'app-home',
  imports: [SearchInput, TrackList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}

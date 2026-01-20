import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./shared/components/ui/sidebar/sidebar";
import { Player } from "./shared/components/ui/player/player";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Player],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('havana');
}

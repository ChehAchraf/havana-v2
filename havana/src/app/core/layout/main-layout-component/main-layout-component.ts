import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '../../../shared/components/ui/sidebar/sidebar';
import {Player} from '../../../shared/components/ui/player/player';

@Component({
  selector: 'app-main-layout-component',
  imports: [RouterOutlet,Sidebar,Player],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
})
export class MainLayoutComponent {

}

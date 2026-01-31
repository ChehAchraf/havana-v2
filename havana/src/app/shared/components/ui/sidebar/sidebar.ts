import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
    isAdmin : boolean = false;

    constructor() {
        if (typeof localStorage !== 'undefined'){
            this.isAdmin = localStorage.getItem('role') === 'ROLE_ADMIN';
        }
    }
}

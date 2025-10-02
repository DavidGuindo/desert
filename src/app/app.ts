import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front-desert');

  constructor(public router: Router) {}


  mainMargin = 256; // Ancho inicial del sidebar expandido en px

  // ⚡ Aseguramos que recibimos boolean
  onSidebarToggle(collapsed: boolean) {
    this.mainMargin = collapsed ? 72 : 256; // 72px ancho colapsado, 256px ancho expandido
  }

  // En login y registro no se muestra el sidebar
  showSidebar(): boolean {
    return !(this.router.url.includes('/login') || this.router.url.includes('/register'));
  }


}

import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NgStyle } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { Observable } from 'rxjs';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, NgStyle, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('front-desert');
  mainMargin = 256; // Ancho inicial del sidebar expandido en px

  public isVisible$: Observable<boolean>;


  constructor(public router: Router, private sidebarService: SidebarService) {
    this.isVisible$ = this.sidebarService.isSidebarVisible$;
  }

  ngOnInit(): void {
  }

  // ⚡ Aseguramos que recibimos boolean
  onSidebarToggle(collapsed: boolean) {
    this.mainMargin = collapsed ? 72 : 256; // 72px ancho colapsado, 256px ancho expandido
  }

  // Manejar logout desde el navbar
  onLogout(): void {
    // Implementar lógica de logout
    console.log('Logout clicked');
    // Aquí puedes agregar la lógica para cerrar sesión
  }

  // En login y registro no se muestra el sidebar
  showSidebar(): boolean {
    return !(this.router.url.includes('/login') || this.router.url.includes('/register'));
  }


}

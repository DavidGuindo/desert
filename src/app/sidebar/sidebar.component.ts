import { Component, EventEmitter, HostBinding, Inject, OnInit, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  darkMode = false;
  collapsed = false;

  @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Usamos HostBinding para añadir una clase al host del componente (`<app-root>`).
  // Esto es útil si quieres estilos específicos para el componente raíz.
  @HostBinding('class.dark-theme') get darkTheme() {
    return this.darkMode;
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.darkMode = true;
      this.renderer.addClass(document.body, 'dark-theme');
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'dark'); // Guardar preferencia
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'light'); // Guardar preferencia
    }
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed); // ⚡ Emitimos boolean correctamente
  }


}

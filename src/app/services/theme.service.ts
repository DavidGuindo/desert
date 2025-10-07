// src/app/services/theme.service.ts
import { Injectable, Inject, Renderer2, RendererFactory2, DOCUMENT } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Usamos un BehaviorSubject para poder tener un valor inicial
  private _isDarkMode = new BehaviorSubject<boolean>(false);
  private renderer: Renderer2; // Para cambiar la clase del tema

  // OBservable para subscribirse
  public isDarkMode$ = this._isDarkMode.asObservable();

  constructor( private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    
    // Obtenemos el ultimo estado del usuario al iniciar
    const savedTheme = localStorage.getItem('isDarkMode');
    const isDarkMode = savedTheme === 'true';
    
    this._isDarkMode.next(isDarkMode);
    this.applyTheme(isDarkMode);
  }

  // Método para cambiar el tema
  public toggleTheme(): void {
    const newMode = !this._isDarkMode.value;
    this._isDarkMode.next(newMode);
    
    // Aplicamos el tema
    this.applyTheme(newMode);
    
    // Guardamos la preferencia en el localStorage del navegador
    localStorage.setItem('isDarkMode', newMode.toString());
  }

  // Aplica o quita el tema oscuro 
  private applyTheme(isDarkMode: boolean): void {
    const body = this.document.body;
    const html = this.document.documentElement;
    
    if (isDarkMode) {
      this.renderer.addClass(body, 'dark-theme');
      this.renderer.addClass(html, 'dark-theme');
    } else {
      this.renderer.removeClass(body, 'dark-theme');
      this.renderer.removeClass(html, 'dark-theme');
    }
  }
}
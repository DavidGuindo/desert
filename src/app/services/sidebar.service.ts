import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
 // BehaviorSubject mantiene el último valor emitido para nuevos suscriptores.
  // Iniciamos el sidebar como 'visible' (true) para desktop, 'cerrado' (false) para móvil.
  private sidebarVisible = new BehaviorSubject<boolean>(window.innerWidth > 768);


  // Exponemos el estado como un Observable público para que los componentes puedan suscribirse
  // pero no puedan emitir nuevos valores directamente. Encapsulación.
  public isSidebarVisible$ = this.sidebarVisible.asObservable();

  constructor() { }

  /**
   * Cambia el estado de visibilidad del sidebar al valor opuesto.
   */
  public toggle(): void {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  /**
   * Muestra el sidebar.
   */
  public open(): void {
    this.sidebarVisible.next(true);
  }

  /**
   * Oculta el sidebar.
   */
  public close(): void {
    this.sidebarVisible.next(false);
  }


}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [MatIcon, MatMenuModule]
})
export class NavbarComponent {
  // Hacemos el componente más reutilizable permitiendo que las URLs vengan de fuera.
  @Input() companyLogoUrl: string = 'assets/images/company-logo.svg'; // Path por defecto
  @Input() userProfileImageUrl: string = 'assets/images/user-avatar.png'; // Path por defecto

  // El navbar no debe saber CÓMO hacer logout, solo debe notificar que se ha solicitado.
  // Esto desacopla la lógica de autenticación.
  @Output() logoutRequest = new EventEmitter<void>();

  constructor(private sidebarService: SidebarService) { }

  /**
   * Llama al servicio para alternar la visibilidad del sidebar.
   */
  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  /**
   * Emite el evento para que el componente padre gestione el logout.
   */
  onLogout(): void {
    this.logoutRequest.emit();
  }

}

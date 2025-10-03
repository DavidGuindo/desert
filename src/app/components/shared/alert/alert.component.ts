import { Component, OnInit} from '@angular/core';
import { NgClass } from '@angular/common';

export enum AlertType {
  Success = 'success',
  Error = 'error',
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [NgClass]
})
export class AlertComponent {

  public AlertType = AlertType;  // La propiedad pública del enum
  textMessage: string = '';  // Propiedad para el mensaje.
  alertType: AlertType = AlertType.Success;// Propiedad para el tipo de alerta (Success o Error).
  isVisible: boolean = false;// Propiedad para controlar la visibilidad.
  duration: number = 4000;// Duración por defecto para auto-ocultarse.
  
  /**
   * Muestra la alerta con el mensaje y el tipo especificado.
   * @param message El texto que se mostrará en la alerta.
   * @param type El tipo de alerta (AlertType.Success o AlertType.Error).
   */
  show(message: string, type: AlertType) {
    this.textMessage = message;
    this.alertType = type;
    
    this.isVisible = true;
    
   // Oculta la alerta automáticamente
    setTimeout(() => {
      this.isVisible = false;
    }, this.duration);
  }
  
  // Cierra la alerta manualmente (si se presiona el botón 'X')
  close() {
    this.isVisible = false;
  }
  
  /**
   * Determina las clases CSS de Bootstrap basadas en el tipo de alerta.
   */
  getAlertClasses(): string {
    const baseClasses = 'alert alert-dismissible fade show custom-alert-position';
    
    switch (this.alertType) {
      case AlertType.Success:
        return `${baseClasses} alert-success`;
      case AlertType.Error:
        return `${baseClasses} alert-danger`;
      default:
        return baseClasses;
    }
  }
}

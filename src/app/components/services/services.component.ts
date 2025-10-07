import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu'; // <-- Necesario para el menú de ordenación
import { MatDialog } from '@angular/material/dialog';

// Componentes propios
import { DeleteConfirmDialogComponent } from '../shared/delete-confirm-dialog/delete-confirm-dialog/delete-confirm-dialog.component';
import { ServiceFormModal } from './service-form-modal/service-form-modal';
import { AlertComponent, AlertType } from "../shared/alert/alert.component";
import { MatDialogModule } from '@angular/material/dialog'; // Asumo que AlertComponent usa el enum AlertType
import { Service } from '../../models/service';
import { StateService } from '../../models/stateService.enum';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    AlertComponent,
    MatDialogModule,
],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit{

  // Datos genericos
  services: Service[] = [
    { id: 'SE-1001', client: 'ASPDOAPSDOASD ASPDOAPSDOASDASPDOAPSDOASDASPDOAPSDOASD' , startDate: new Date(2025, 0, 15), endDate: new Date(2025, 2, 15), observations: 'Implementación de red crítica.', reportPDF: '/inf/SE-1001.pdf', reportWord: '/tpl/implem.docx', signedRequest: '/req/1001.zip', totalPrice: 4500.00, urgent: true, nodo: 5, enable: true, state: 2, samples: [] },
    { id: 'SE-1002', client: 'USR-2', startDate: new Date(2024, 11, 10), endDate: new Date(2025, 1, 5), observations: 'Revisión y optimización de base de datos.', reportPDF: '', reportWord: '/tpl/consult.docx', signedRequest: '/req/1002.zip', totalPrice: 1200.50, urgent: false, nodo: 12, enable: true, state: 1, samples: [] },
    { id: 'SE-1003', client: 'USR-3', startDate: new Date(2025, 1, 20), endDate: new Date(2025, 1, 20), observations: 'Actualización de firmware de servidores.', reportPDF: '/inf/SE-1003.pdf', reportWord: '/tpl/maint.docx', signedRequest: '/req/1003.zip', totalPrice: 650.00, urgent: true, nodo: 22, enable: true, state: 4 , samples: []},
    { id: 'SE-1004', client: 'USR-4', startDate: new Date(2025, 2, 5), endDate: new Date(2025, 4, 30), observations: 'Soporte de segundo nivel trimestral.', reportPDF: '', reportWord: '/tpl/support.docx', signedRequest: '/req/1004.zip', totalPrice: 3100.00, urgent: false, nodo: 3, enable: true, state: 2 , samples: []},
    { id: 'SE-1005', client: 'USR-5', startDate: new Date(2024, 10, 1), endDate: new Date(2025, 0, 1), observations: 'Desarrollo de landing page promocional.', reportPDF: '/inf/SE-1005.pdf', reportWord: '/tpl/webdev.docx', signedRequest: '/req/1005.zip', totalPrice: 2500.00, urgent: false, nodo: 45, enable: true, state: 5 , samples: []},
    { id: 'SE-1006', client: 'USR-6', startDate: new Date(2025, 3, 1), endDate: new Date(2025, 5, 1), observations: 'Análisis de seguridad y vulnerabilidades.', reportPDF: '', reportWord: '/tpl/audit.docx', signedRequest: '/req/1006.zip', totalPrice: 5800.75, urgent: true, nodo: 1, enable: true, state: 2 , samples: []},
    { id: 'SE-1007', client: 'USR-7', startDate: new Date(2024, 8, 1), endDate: new Date(2024, 10, 1), observations: 'Implementación de nueva infraestructura.', reportPDF: '/inf/SE-1007.pdf', reportWord: '/tpl/implem.docx', signedRequest: '/req/1007.zip', totalPrice: 8900.00, urgent: false, nodo: 88, enable: true, state: 4 , samples: []},
    { id: 'SE-1008', client: 'USR-8', startDate: new Date(2025, 4, 1), endDate: new Date(2025, 4, 15), observations: 'Reuniones de consultoría semanal.', reportPDF: '', reportWord: '/tpl/consult.docx', signedRequest: '/req/1008.zip', totalPrice: 950.00, urgent: false, nodo: 10, enable: true, state: 1 , samples: []},
    { id: 'SE-1009', client: 'USR-9', startDate: new Date(2024, 7, 10), endDate: new Date(2024, 7, 10), observations: 'Servicio cancelado por el client.', reportPDF: '', reportWord: '', signedRequest: '/req/1009.zip', totalPrice: 150.00, urgent: false, nodo: 30, enable: false, state: 3 , samples: []},
    { id: 'SE-1010', client: 'USR-1', startDate: new Date(2025, 0, 1), endDate: new Date(2025, 2, 1), observations: 'Desarrollo de módulo de facturación.', reportPDF: '', reportWord: '/tpl/webdev.docx', signedRequest: '/req/1010.zip', totalPrice: 4200.00, urgent: false, nodo: 7, enable: true, state: 3 , samples: []},
    { id: 'SE-1011', client: 'USR-10', startDate: new Date(2025, 4, 10), endDate: new Date(2025, 5, 20), observations: 'Migración a la nube (Fase I).', reportPDF: '', reportWord: '/tpl/implem.docx', signedRequest: '/req/1011.zip', totalPrice: 6700.00, urgent: true, nodo: 50, enable: true, state: 2 , samples: []},
    { id: 'SE-1012', client: 'USR-2', startDate: new Date(2025, 5, 1), endDate: new Date(2025, 5, 15), observations: 'Soporte de emergencia para fallos.', reportPDF: '/inf/SE-1012.pdf', reportWord: '/tpl/support.docx', signedRequest: '/req/1012.zip', totalPrice: 1800.00, urgent: true, nodo: 18, enable: true, state: 4 , samples: []},
    { id: 'SE-1013', client: 'USR-3', startDate: new Date(2025, 6, 1), endDate: new Date(2025, 6, 30), observations: 'Auditoría de licencias de software.', reportPDF: '', reportWord: '/tpl/audit.docx', signedRequest: '/req/1013.zip', totalPrice: 3400.00, urgent: false, nodo: 2, enable: true, state: 1, samples: [] },
    { id: 'SE-1014', client: 'USR-4', startDate: new Date(2024, 12, 1), endDate: new Date(2025, 1, 1), observations: 'Mantenimiento preventivo anual.', reportPDF: '/inf/SE-1014.pdf', reportWord: '/tpl/maint.docx', signedRequest: '/req/1014.zip', totalPrice: 800.00, urgent: false, nodo: 60, enable: true, state: 5 , samples: []},
    { id: 'SE-1015', client: 'USR-5', startDate: new Date(2025, 7, 1), endDate: new Date(2025, 9, 1), observations: 'Proyecto de consultoría estratégica.', reportPDF: '', reportWord: '/tpl/consult.docx', signedRequest: '/req/1015.zip', totalPrice: 7200.00, urgent: false, nodo: 15, enable: true, state: 2 , samples: []},
    { id: 'SE-1016', client: 'USR-6', startDate: new Date(2024, 9, 1), endDate: new Date(2024, 11, 15), observations: 'Desarrollo de API de terceros.', reportPDF: '/inf/SE-1016.pdf', reportWord: '/tpl/webdev.docx', signedRequest: '/req/1016.zip', totalPrice: 5100.00, urgent: true, nodo: 25, enable: true, state: 5 , samples: []},
    { id: 'SE-1017', client: 'USR-7', startDate: new Date(2025, 3, 15), endDate: new Date(2025, 4, 15), observations: 'Implementación de sistema CRM.', reportPDF: '', reportWord: '/tpl/implem.docx', signedRequest: '/req/1017.zip', totalPrice: 4800.00, urgent: false, nodo: 33, enable: true, state: 3 , samples: []},
    { id: 'SE-1018', client: 'USR-8', startDate: new Date(2025, 6, 20), endDate: new Date(2025, 7, 20), observations: 'Soporte técnico avanzado mensual.', reportPDF: '', reportWord: '/tpl/support.docx', signedRequest: '/req/1018.zip', totalPrice: 1100.00, urgent: false, nodo: 9, enable: true, state: 2 , samples: []},
    { id: 'SE-1019', client: 'USR-9', startDate: new Date(2025, 8, 1), endDate: new Date(2025, 9, 1), observations: 'Auditoría interna de procesos.', reportPDF: '', reportWord: '/tpl/audit.docx', signedRequest: '/req/1019.zip', totalPrice: 2700.00, urgent: false, nodo: 40, enable: true, state: 1 , samples: []},
    { id: 'SE-1020', client: 'USR-1', startDate: new Date(2024, 10, 20), endDate: new Date(2025, 0, 20), observations: 'Mantenimiento correctivo de emergencia.', reportPDF: '/inf/SE-1020.pdf', reportWord: '/tpl/maint.docx', signedRequest: '/req/1020.zip', totalPrice: 900.00, urgent: true, nodo: 55, enable: true, state: 4 , samples: []},
    { id: 'SE-1021', client: 'USR-10', startDate: new Date(2025, 0, 1), endDate: new Date(2025, 1, 15), observations: 'Consultoría para escalabilidad.', reportPDF: '/inf/SE-1021.pdf', reportWord: '/tpl/consult.docx', signedRequest: '/req/1021.zip', totalPrice: 3900.00, urgent: false, nodo: 14, enable: true, state: 5 , samples: []},
    { id: 'SE-1022', client: 'USR-2', startDate: new Date(2025, 2, 1), endDate: new Date(2025, 3, 1), observations: 'Desarrollo de microservicio de login.', reportPDF: '', reportWord: '/tpl/webdev.docx', signedRequest: '/req/1022.zip', totalPrice: 3000.00, urgent: false, nodo: 1, enable: true, state: 2 , samples: []},
    { id: 'SE-1023', client: 'USR-3', startDate: new Date(2025, 1, 1), endDate: new Date(2025, 4, 1), observations: 'Implementación de ERP.', reportPDF: '', reportWord: '/tpl/implem.docx', signedRequest: '/req/1023.zip', totalPrice: 9500.00, urgent: true, nodo: 77, enable: true, state: 2 , samples: []},
    { id: 'SE-1024', client: 'USR-4', startDate: new Date(2024, 6, 1), endDate: new Date(2024, 8, 1), observations: 'Servicio de soporte finalizado.', reportPDF: '/inf/SE-1024.pdf', reportWord: '/tpl/support.docx', signedRequest: '/req/1024.zip', totalPrice: 2200.00, urgent: false, nodo: 19, enable: true, state: 4 , samples: []},
    { id: 'SE-1025', client: 'USR-5', startDate: new Date(2025, 5, 15), endDate: new Date(2025, 6, 15), observations: 'Auditoría de código legacy.', reportPDF: '', reportWord: '/tpl/audit.docx', signedRequest: '/req/1025.zip', totalPrice: 2900.00, urgent: false, nodo: 25, enable: true, state: 1 , samples: []},
    { id: 'SE-1026', client: 'USR-6', startDate: new Date(2025, 8, 1), endDate: new Date(2025, 10, 1), observations: 'Consultoría para estrategia de marketing.', reportPDF: '', reportWord: '/tpl/consult.docx', signedRequest: '/req/1026.zip', totalPrice: 6000.00, urgent: false, nodo: 65, enable: true, state: 2 , samples: []},
    { id: 'SE-1027', client: 'USR-7', startDate: new Date(2024, 10, 15), endDate: new Date(2024, 12, 15), observations: 'Proyecto cancelado en fase inicial.', reportPDF: '', reportWord: '', signedRequest: '/req/1027.zip', totalPrice: 500.00, urgent: false, nodo: 17, enable: false, state: 1 , samples: []},
    { id: 'SE-1028', client: 'USR-8', startDate: new Date(2025, 3, 20), endDate: new Date(2025, 5, 20), observations: 'Mantenimiento de infraestructura cloud.', reportPDF: '/inf/SE-1028.pdf', reportWord: '/tpl/maint.docx', signedRequest: '/req/1028.zip', totalPrice: 1500.00, urgent: false, nodo: 80, enable: true, state: 5, samples: [] },
    { id: 'SE-1029', client: 'USR-9', startDate: new Date(2025, 7, 5), endDate: new Date(2025, 9, 5), observations: 'Desarrollo de nueva característica.', reportPDF: '', reportWord: '/tpl/webdev.docx', signedRequest: '/req/1029.zip', totalPrice: 4400.00, urgent: true, nodo: 20, enable: true, state: 3 , samples: []},
    { id: 'SE-1030', client: 'USR-10', startDate: new Date(2025, 2, 1), endDate: new Date(2025, 2, 10), observations: 'Soporte post-implementación.', reportPDF: '/inf/SE-1030.pdf', reportWord: '/tpl/support.docx', signedRequest: '/req/1030.zip', totalPrice: 750.00, urgent: false, nodo: 11, enable: true, state: 4 , samples: []}
  
  ]; 
  
  // Variables para paginación
  pageIndex: number = 0;
  pageSize: number = 8;
  filteredServices = this.services;

  public AlertType = AlertType; 
  public SateService =  StateService;

  // Obtiene una referencia de componentes
  @ViewChild('alert') alert!: AlertComponent;
  @ViewChild('formModalService') formModalService!: ServiceFormModal;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    //TODO: Obtener servicios completos con total de ensayos y total de ensayos completados
  }

  // Calcula el progreso de los servicios
  // getProgress(service: Service): number {
  //   return (service.completedTasks / service.totalTasks) * 100;
  // }

  // Método para ordenar servicios
  sort(sortKey: 'client' | 'urgent'): void {
    
    // Primero ordenamos el array principal
    this.services.sort((a, b) => {
      // Ordenar por cliente alfabetico
      if (sortKey === 'client') {
        const nameA = a.client.toUpperCase();
        const nameB = b.client.toUpperCase();
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      } 
      
      // Ordenar por Urgente primero
      else if (sortKey === 'urgent') {
        return Number(b.urgent) - Number(a.urgent);
      }
      
      return 0;
    });

    // Reaplicamos el filtro para actualizar filteredServices y la paginación.
    // Usamos una cadena vacía para mantener el filtro actual (mostrar todos si no había filtro).
    this.applyFilter({ target: { value: '' } } as unknown as Event);
  }

  // Aplicar filtro de búsqueda
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    // Filtra y guarda en otra variable para usar en el template
    this.filteredServices = this.services.filter(service =>
      Object.values(service).some(val =>
        String(val).toLowerCase().includes(filterValue)
      )
    );

    this.pageIndex = 0; // resetear paginación
  }

  // Pasar página
  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  // Servicios por página
  get paginatedServices() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredServices.slice(start, end);
  }

  // Obtener clase para aplicar color según el state
  getColorClassForState(state: StateService): string {
    switch (state) {
      case StateService.Solicitado:
        return 'bg-primary'; // Azul para solicitado
      case StateService.Aceptado:
        return 'bg-info text-dark'; // Celeste para aceptado
      case StateService.EnProgreso:
        return 'bg-secondary'; // Gris para en progreso
      case StateService.PdtInforme:
        return 'bg-warning text-dark'; // Amarillo para pendiente de informe
      case StateService.Completado:
        return 'bg-success'; // Verde para completado
      case StateService.Cancelado:
      case StateService.Rechazado:
        return 'bg-danger'; // Rojo para cancelado y rechazado
      default:
        return 'bg-light text-dark'; // Un color por defecto
    }
  }

  // Obtener nombre del state
  getNameState(state: StateService): string {
    switch (state) {
      case StateService.Solicitado:
        return 'Solicitado';
      case StateService.Aceptado:
        return 'Aceptado';
      case StateService.EnProgreso:
        return 'En Progreso'; 
      case StateService.PdtInforme:
        return 'Pendiente de Informe';
      case StateService.Completado:
        return 'Completado';
      case StateService.Cancelado:
        return 'Cancelado';
      case StateService.Rechazado:
        return 'Rechazado';
      default:
        return 'Desconocido';
    }
  }

  // Gestiona el pop-up de confirmación para eliminar servicio
  openDeleteConfirmDialog(serviceId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, { 
      width: '400px', 
      position: { top: '50px' } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica de eliminación
        this.services = this.services.filter(service => service.id !== serviceId);
        this.applyFilter({ target: { value: '' } } as unknown as Event);
        
        // Muestra la alerta de éxito
        this.alert.show("Servicio eliminado con éxito!", this.AlertType.Success); 
      } else {
        // Muestra la alerta de error/cancelación
        this.alert.show("Eliminación cancelada.", this.AlertType.Error);
      }
    });
  }

  // Abre el modal de servicio
  openModalService(service?: any): void{

    const dialogRef = this.dialog.open(ServiceFormModal, {
      width: '90vw',
      maxWidth: '1200px',
      disableClose: true, // Evita que se cierre al hacer clic fuera
      data: service,
      position: { top: '40px' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos guardados:', result);
        // Aquí llamarías a tu servicio para enviar los datos actualizados a la API
        // this.apiService.updateServicio(result).subscribe(...);
      } else {
        console.log('El diálogo fue cancelado.');
      }
    });
  }


}

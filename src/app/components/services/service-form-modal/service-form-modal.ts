import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importaciones de Angular Material
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'; // <-- Para el Datepicker
import { MatNativeDateModule } from '@angular/material/core';

import { Service } from '../../../models/service';
import { Sample } from '../../../models/sample';
import { TrialOfSample } from '../../../models/trialOfSample';
import { AlertComponent, AlertType } from "../../shared/alert/alert.component";
import { MatTabsModule } from '@angular/material/tabs';

// Datos que el modal espera recibir
export interface ServicioEditorservice {
  service: Service;
}

@Component({
  selector: 'app-service-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AlertComponent,
    MatTabsModule,
],
  templateUrl: './service-form-modal.html',
  styleUrls: ['./service-form-modal.scss'],
})
export class ServiceFormModal implements OnInit {
  // --- Propiedades del Componente ---
  servicioForm!: FormGroup;
  clientes: any[] = [];
  contactos: any[] = [];
  contactosFiltrados: any[] = [];
  @ViewChild('alert') alert!: AlertComponent;
  public AlertType = AlertType; 
  

  
  constructor ( private fb: FormBuilder, public dialogRef: MatDialogRef<ServiceFormModal>, @Inject(MAT_DIALOG_DATA) public service: Service ) { }

  ngOnInit(): void {
    this.cargarDatosMaestros(); // Simula la carga de clientes y contactos desde un API
    this.inicializarFormulario();
    this.configurarDependencias();

    // Rellenamos el formulario con los datos iniciales o lo desactivamos
    if (this.service) {
      // Usamos un mapeo para asegurar que los objetos del select coincidan
      const clienteSeleccionado = this.clientes.find(c => c.id === this.service.client);
      
      const formValue = {
        ...this.service,
        cliente: clienteSeleccionado,
      };

      this.servicioForm.patchValue(formValue);
    } else {
      this.servicioForm.disable();
    }
    
  }
 
  // Getter para acceso a formulario
  get form(): { [key: string]: AbstractControl } {
    return this.servicioForm.controls;
  }

  private inicializarFormulario(): void {
    this.servicioForm = this.fb.group(
      {
        cliente: [null, Validators.required],
        contacto: [
          { 
            value: null, 
            disabled: true 
          },
          Validators.required],
        observaciones: ['', Validators.maxLength(500)],
        fechaInicio: [null, Validators.required],
        fechaFin: [null, Validators.required]
      }, {
        // Añadimos un validador a nivel de grupo para las fechas
        validators: this.validadorFechas
      }
    );
  }

  // Validador personalizado para asegurar que la fecha de fin sea posterior a la de inicio
  private validadorFechas(control: AbstractControl): ValidationErrors | null {
    const fechaInicio = control.get('fechaInicio')?.value;
    const fechaFin = control.get('fechaFin')?.value;

    if (fechaInicio && fechaFin && new Date(fechaFin) <= new Date(fechaInicio)) {
      // Devolvemos un objeto de error si la validación falla
      return { fechasInvalidas: true };
    }
    // Devolvemos null si la validación es correcta
    return null;
  }

  private configurarDependencias(): void {
    // Escuchamos los cambios en el selector de cliente
    this.servicioForm.get('cliente')?.valueChanges.subscribe(
      (clienteSeleccionado: any) => {
        const controlContacto = this.servicioForm.get('contacto');
        controlContacto?.reset(); // Limpiamos el valor anterior

        if (clienteSeleccionado) {
          // Filtramos los contactos que pertenecen al cliente seleccionado
          this.contactosFiltrados = this.contactos.filter(c => c.clienteId === clienteSeleccionado.id);
          controlContacto?.enable(); // Habilitamos el selector de contacto
        } else {
          this.contactosFiltrados = [];
          controlContacto?.disable(); // Lo deshabilitamos si no hay cliente
        }
      }
    );
  }

  private cargarDatosMaestros(): void {
    // Simulación de una llamada a un API
    this.clientes = [
      { id: 1, nombre: 'Empresa A (Tecnología)' },
      { id: 2, nombre: 'Compañía B (Consultoría)' },
      { id: 3, nombre: 'Organización C (Logística)' }
    ];

    this.contactos = [
      { id: 10, clienteId: 1, nombre: 'Ana García', email: 'ana.g@empresa-a.com' },
      { id: 11, clienteId: 1, nombre: 'Luis Torres', email: 'luis.t@empresa-a.com' },
      { id: 20, clienteId: 2, nombre: 'Marta Jiménez', email: 'marta.j@compania-b.com' },
      { id: 30, clienteId: 3, nombre: 'Carlos Ruiz', email: 'carlos.r@org-c.com' },
      { id: 31, clienteId: 3, nombre: 'Sofía Navarro', email: 'sofia.n@org-c.com' }
    ];
  }


  onSave(): void {
    if (this.servicioForm.valid) {
      this.dialogRef.close(this.servicioForm.getRawValue());
    } else {
      // Lanza error personalzado
      this.servicioForm.hasError('fechasInvalidas') ?
        this.alert.show("Rango de fechas incorrecto", this.AlertType.Error)
        : this.alert.show("Datos incorrectos, revise los datos introducidos", this.AlertType.Error); 
      
      // Marca el formulario en rojo
      this.servicioForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
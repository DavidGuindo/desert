import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
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

import { Service } from '../models/service'; // Ajusta la ruta
import { Sample } from '../models/sample';
import { TrialOfSample } from '../models/trialOfSample';

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
  ],
  templateUrl: './service-form-modal.html',
  styleUrls: ['./service-form-modal.scss'],
})
export class ServiceFormModal implements OnInit {
  servicioForm!: FormGroup;
  selectedMuestraIndex: number | null = null;

  constructor ( private fb: FormBuilder, public dialogRef: MatDialogRef<ServiceFormModal>, @Inject(MAT_DIALOG_DATA) public service: Service ) { }

  ngOnInit(): void {
    this.buildForm();
    // Rellenamos el formulario con los datos iniciales
    if (this.service) {
      this.servicioForm.patchValue(this.service);
      this.service.samples.forEach(sample => {
        this.addMuestra(sample);
      });
    }
  }
  // --- Lógica para construir el formulario ---
  private buildForm(): void {
    this.servicioForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      usuario: ['', Validators.required],
      cliente: ['', Validators.required],
      muestras: this.fb.array([]),
    });
  }

  // --- Getters para acceder fácilmente a los FormArrays en la plantilla ---
  get muestras(): FormArray {
    return this.servicioForm.get('muestras') as FormArray;
  }

  getEnsayos(muestraIndex: number): FormArray {
    return this.muestras.at(muestraIndex).get('ensayos') as FormArray;
  }



  private createMuestra(muestra?: Sample): FormGroup {
    const formGroup = this.fb.group({
      id: [muestra?.id || null],
      codigo: [muestra?.id || '', Validators.required],
      ensayos: this.fb.array([]),
    });
    // Si la muestra tiene ensayos, los añadimos al sub-array
    if (muestra?.ensayos) {
      muestra.ensayos.forEach(ensayo => {
        (formGroup.get('ensayos') as FormArray).push(this.createEnsayo(ensayo));
      });
    }
    return formGroup;
  }

  private createEnsayo(ensayo?: TrialOfSample): FormGroup {
    return this.fb.group({
      id: [ensayo?.id || null],
      nombre: [ensayo?.nameCode || '', Validators.required],
      resultado: [ensayo?.trialCode || null],
    });
  }

  // --- Lógica para añadir/eliminar elementos ---
  addMuestra(muestra?: Sample): void {
    const muestraFormGroup = this.createMuestra(muestra);
    this.muestras.push(muestraFormGroup);
  }

  addEnsayo(muestraIndex: number): void {
    const ensayosArray = this.getEnsayos(muestraIndex);
    ensayosArray.push(this.createEnsayo());
  }

  removeMuestra(index: number): void {
    this.muestras.removeAt(index);
    if (this.selectedMuestraIndex === index) {
      this.selectedMuestraIndex = null; // Deseleccionar si se borra la muestra activa
    }
  }

  removeEnsayo(muestraIndex: number, ensayoIndex: number): void {
    this.getEnsayos(muestraIndex).removeAt(ensayoIndex);
  }

  // --- Lógica de la UI y del modal ---
  selectMuestra(index: number): void {
    this.selectedMuestraIndex = index;
  }

  // Función de ayuda para el casting en la plantilla
  toFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  onSave(): void {
    if (this.servicioForm.valid) {
      this.dialogRef.close(this.servicioForm.getRawValue());
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.servicioForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
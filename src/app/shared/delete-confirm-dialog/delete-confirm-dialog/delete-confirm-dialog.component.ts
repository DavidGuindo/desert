import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss'],
  imports: [MatDialogModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
})
export class DeleteConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>) { }
}

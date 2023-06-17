import { Component, Inject } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styles: [
  ]
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ) {}

  onNoClick(): void {
    this.dialogRef.close( false );
  }

  onClick():void {
    this.dialogRef.close(true);
  }
}

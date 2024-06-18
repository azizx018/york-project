import { Component, Inject, Input } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialog,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Patient } from '../../../types';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { PatientsService } from '../../../services/patients.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose,MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() patient:Patient = {} as Patient;

  constructor(public dialog: MatDialog){}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let box =this.dialog.open(DialogBoxDisplay, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        patient: this.patient
      }
    });
  }

}

@Component({
  selector: 'dialog-box-display',
  templateUrl: 'dialog-box-display.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RouterLink],
})
export class DialogBoxDisplay{
  constructor(
    public dialogRef: MatDialogRef<DialogBoxDisplay>,
    private _patientService: PatientsService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { patient: Patient },
  ) {}
  onDeleteClicked(): void{
      this._patientService.deletePatientById(this.data.patient.id).subscribe(() => {
          this._router.navigate(['dashboard']);
      })
  }
}

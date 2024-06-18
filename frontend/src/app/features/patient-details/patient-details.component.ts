import { NgFor, NgIf } from '@angular/common';
import { Component, Output } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { Note, Patient } from '../../types';
import { PatientsService } from '../../services/patients.service';
import { MatButton } from '@angular/material/button';
import {MatDialog,} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { HeaderComponent } from '../../shared/header/header.component';


@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [RouterOutlet, NgFor, RouterLink, MatCardModule, MatButton, DialogComponent, NgIf, HeaderComponent],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css',
  
})
export class PatientDetailsComponent {
   
  patient: Patient = {} as Patient;
  id: string = '';
  
  constructor(
    private patientService: PatientsService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ){}

  ngOnInit(){
    
    this.route.params.subscribe(params => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      });
   
    this.patientService.getPatientById(this.id!).subscribe(response => {
      this.patient = response;
    })
  }

}
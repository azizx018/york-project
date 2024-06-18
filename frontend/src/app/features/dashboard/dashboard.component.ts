import { Component } from '@angular/core';
import { Patient } from '../../types';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PatientsService } from '../../services/patients.service';
import { FormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, FormsModule, MatChipsModule, NgIf, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  patients: Patient[] = [];

  

  constructor(
    private _patientService: PatientsService,
  ){}

  public ngOnInit(): void{
   
  this._patientService.getPatients().subscribe(patients => {
    this.patients = patients;
    patients.sort((a, b) =>
    a.referralStatus.localeCompare(b.referralStatus));
    
   });
  }
 

}

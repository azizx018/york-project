import { Component, Input, OnInit } from '@angular/core';
import { PatientsService } from '../../services/patients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Patient } from '../../types';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {NgxMaskDirective, NgxMaskPipe} from 'ngx-mask'

@Component({
  selector: 'app-patient-add-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, HeaderComponent, MatSelectModule, MatInputModule, MatFormFieldModule, MatButton, MatCardModule,NgxMaskDirective, NgxMaskPipe],
  templateUrl: './patient-add-edit.component.html',
  styleUrl: './patient-add-edit.component.css'
})
export class PatientAddEditComponent implements OnInit {
  @Input() buttonText: string = 'Save';
  patient:Patient = {} as Patient;
  id: string = '';
  isFormSubmitted = false;

  patientForm:FormGroup = this.formBuilder.group({
    name: new FormControl('',[Validators.required]),
    dateOfBirth: new FormControl('',[Validators.required]),
    contactInfo: new FormControl('',[Validators.required, Validators.pattern('[0-9]{10}')]),
    referralReason : new FormControl('',[Validators.required]),
    referralStatus: new FormControl('', [Validators.required]),
    referralReasonOther: new FormControl(''),
    noteText: new FormControl('')
  })
 
//checking to see if there is an id - there should always be an id for edit
  get isEdit(): boolean {
    return this.id?.length > 0 || false;
  }

  get pageType(): string {
    return this.isEdit ? 'Edit' : 'Add';
  }

  get showReferralReasonOther(): boolean {
    return this.patientForm.value.referralReason === 'Other'
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientsService) {}


  ngOnInit(): void {
    //edit 
    this.route.params.subscribe(params => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      if (this.isEdit) {
        this.patientService.getPatientById(this.id).subscribe(data => {
          this.patient = data;          

          //sets the data from the server in the form
          this.patientForm.controls['name'].setValue(this.patient.name);
          this.patientForm.controls['dateOfBirth'].setValue(this.patient.dateOfBirth);
          this.patientForm.controls['contactInfo'].setValue(this.patient.contactInfo);

          //logic
          const notOther = [ 'Certain Death', 'Second Opinion' ]
          if (!notOther.includes(this.patient.referralReason)) {
            this.patientForm.controls['referralReason'].setValue('Other');
          } else {
            this.patientForm.controls['referralReason'].setValue(this.patient.referralReason);
          }
          if (this.showReferralReasonOther) {
            this.patientForm.controls['referralReasonOther'].setValue(this.patient.referralReason);
          }
          this.patientForm.controls['referralStatus'].setValue(this.patient.referralStatus);
        });
        //add patient so you need a new patient object
      } else {
        this.patient = {} as Patient;
      }
    })  
  }

  onSubmit():void {

    const isFormValid = this.patientForm.valid;
    this.isFormSubmitted  = true;

    if (isFormValid) {
      this.patient = Object.assign(this.patient, this.patientForm.value);
      if (this.showReferralReasonOther) {
        this.patient.referralReason = this.patientForm.value.referralReasonOther;
      }
      console.log(this.patient);
      
      if (!this.isEdit) {
        this.patientService.addPatient(this.patient).subscribe((p) => {
          this.router.navigate(['patient', p.id])
        });      
      } else {
        this.patientService.updatePatient(this.patient.id, this.patient).subscribe(() => {
          this.router.navigate(['patient', this.patient.id])
        });
      }
    } else {
      this.isFormSubmitted = false;
    }
  }
}

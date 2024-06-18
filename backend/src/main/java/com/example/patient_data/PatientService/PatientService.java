package com.example.patient_data.PatientService;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.patient_data.PatientRepository.NoteRepository;
import com.example.patient_data.PatientRepository.PatientRepository;
import com.example.patient_data.entity.Note;
import com.example.patient_data.entity.Patient;

@Service
public class PatientService {

    private  PatientRepository patientRepository;

    private NoteRepository noteRepository;

   @Autowired
   public PatientService(PatientRepository patientRepository, NoteRepository noteRepository) {
       this.patientRepository = patientRepository;
       this.noteRepository = noteRepository;
   }

   //save a patient
   public Patient createPatient(Patient patient) {
        patient.setCreatedAt(java.time.LocalDate.now());
        patient.setUpdatedAt(java.time.LocalDate.now());
        patient = patientRepository.save(patient);
        

        if (patient.getNoteText() != null && patient.getNoteText().trim().length() > 0) {
            Note note = new Note(patient, patient.getNoteText(), java.time.LocalDate.now());
            note = noteRepository.save(note);
            patient.addNote(note);
        }

        return patient;
   }

   //get all patients -- returns a list of patients
   public List <Patient> getAllPatients() {
    return patientRepository.findAll();
   }

    //get 1 patient by patient id
    public Optional<Patient> getPatientById(Integer id) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            var p = patient.get();
            List<Note> notes = noteRepository.findAllNotesByPatient_Id(p.getId());
            p.setNotes(notes);
            return  Optional.ofNullable(p);
        }
        return patient;
    }   

   //Update a patient
   public Patient updatePatient(Integer id, Patient updatedPatient) throws Exception {
    Optional<Patient> existingPatient = patientRepository.findById(id);
    if (existingPatient.isPresent()) {
        Patient patient = existingPatient.get();
        patient.setName(updatedPatient.getName());
        patient.setDateOfBirth(updatedPatient.getDateOfBirth());
        patient.setContactInfo(updatedPatient.getContactInfo());
        patient.setReferralReason(updatedPatient.getReferralReason());
        patient.setReferralStatus(updatedPatient.getReferralStatus());
        patient.setUpdatedAt(java.time.LocalDate.now());

        if (updatedPatient.getNoteText() != null && updatedPatient.getNoteText().trim().length() > 0) {
            Note note = new Note(patient, updatedPatient.getNoteText(), java.time.LocalDate.now());
            noteRepository.save(note);
        }

        return patientRepository.save(patient);
    } else {
        throw new Exception("Patient not found");
    }
   }

   //delete a patient
   public void deletePatient(Integer id) {
    patientRepository.deleteById(id);
   }

}

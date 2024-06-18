package com.example.patient_data.PatientRepository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.patient_data.entity.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findAllNotesByPatient_Id(Integer patientId);
}


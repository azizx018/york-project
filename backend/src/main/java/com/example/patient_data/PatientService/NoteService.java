package com.example.patient_data.PatientService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.patient_data.PatientRepository.NoteRepository;
import com.example.patient_data.entity.Note;

@Service
public class NoteService {
    private NoteRepository noteRepository;

    @Autowired
   public NoteService(NoteRepository noteRepository) {
       this.noteRepository = noteRepository;
   }

   //save a note
   public Note createNote(Note note) {
    return noteRepository.save(note);
   }

   //get notes by patient id
   public List<Note> getNoteByPatientId(Integer id) {
    return noteRepository.findAllNotesByPatient_Id(id);
   }
}

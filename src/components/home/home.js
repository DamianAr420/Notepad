import React, { useState } from 'react';
import "./home.css";
import NewNote from "../newNote/newNote";
import EditNote from "../editNote/editNote";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);
  const [notes, setNotes] = useState([
    { title: "Notatka 1", desc: "Opis notatki 1. Tutaj znajduje się bardzo długa treść, która będzie testowana.", date: "04.10.2024" },
    { title: "Notatka 2", desc: "Opis notatki 2. Tutaj również mamy bardzo długą treść do przetestowania.", date: "05.10.2024" }
  ]);
  const [openedNote, setOpenedNote] = useState(null);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false)

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
    setIsOpened(false);
  };

  const openNewNote = () => {
    setIsOpened(!isOpened);
    setNoteToEdit(null);
  };

  const toggleNote = (index) => {
    setOpenedNote(openedNote === index ? null : index);
  };

  const closeEditing = () => {
    setIsEditing(false);
  }

  const handleEditClick = (note) => {
    setNoteToEdit(note);
    setIsOpened(false);
    setIsEditing(true);
  };

  const handleDeleteClick = (e, index) => {
    e.stopPropagation();
    const updatedNotes = notes.filter((note, i) => i !== index);
    setNotes(updatedNotes);
    
    if (openedNote === index) {
      setOpenedNote(null);
    }
  };

  const editNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.title === noteToEdit.title ? updatedNote : note))
    );
    setNoteToEdit(null);
  };

  return (
    <div className='page'>
      <div className='header'>
        Your Notes
      </div>
      <div className="body">
        {isOpened && (
          <NewNote closeNote={openNewNote} addNote={addNote} />
        )}
        {isEditing && noteToEdit && (
          <EditNote 
            closeNote={closeEditing} 
            editNote={editNote} 
            noteToEdit={noteToEdit} 
          />
        )}
        {notes.map((note, index) => {
          return (
            <div
              key={index}
              className={`note ${openedNote === index ? "open" : ""}`}
              onClick={() => toggleNote(index)}
            >
              <h1>{note.title}</h1>
              {openedNote === index && <p>{note.desc}</p>}
              <div className="button-container">
                <button className='edit' onClick={(e) => { e.stopPropagation(); handleEditClick(note); }}>Edit</button>
                <button className='delete' onClick={(e) => handleDeleteClick(e, index)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="newNote" onClick={openNewNote}>
        New Note
      </div>
    </div>
  );
}

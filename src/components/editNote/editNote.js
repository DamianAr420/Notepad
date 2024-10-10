import React, { useState, useEffect } from 'react';
import "./editNote.css";

export default function EditNote({ closeNote, editNote, noteToEdit }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDesc(noteToEdit.desc);
    }
  }, [noteToEdit]);

  const saveNote = () => {
    if (title && desc) {
      const updatedNote = {
        title: title,
        desc: desc,
        date: new Date().toLocaleDateString(),
      };
      editNote(updatedNote);
      closeNote();
    }
  };

  return (
    <div className='editNoteBox'>
      <div className="editTitleBox">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
        />
        <button className='editSave' onClick={saveNote}>Save</button>
        <button className='editClose' onClick={closeNote}>Close</button>
      </div>
      <div className='editDescBox'>
        <textarea 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
          placeholder="Description">
        </textarea>
      </div>
    </div>
  );
}

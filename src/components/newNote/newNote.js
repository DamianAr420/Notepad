import React, { useState } from 'react';
import "./newNote.css";

export default function NewNote({ closeNote, addNote }) {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const close = () => {
    closeNote();
  };

  const save = () => {
    if (title && desc) {
      const newNote = {
        title: title,
        desc: desc,
        date: new Date().toLocaleDateString()
      };
      addNote(newNote);
    }
  };

  const setState = (event) => {
    if(event.target.name === "title") {
      setTitle(event.target.value)
    } else setDesc(event.target.value)

    console.log(`${title} + ${desc}`)
  };

  return (
    <div className='newNoteBox'>
      <div className="titleBox">
        <input name='title' type="text" onChange={setState}/>
        <button className='save' onClick={save}>Save</button>
        <button className='close' onClick={close}>Close</button>
      </div>
      <div className='descBox'>
        <textarea name='desc' onChange={setState}></textarea>
      </div>
    </div>
  );
}

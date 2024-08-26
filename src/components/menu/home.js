import React, { useState, useEffect } from 'react';
import './home.css';

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState("star-regular.svg");
  const [addNoteStatus, setAddNoteStatus] = useState(false);
  const [note, setNote] = useState([]);
  const [noteType, setNoteType] = useState("Note");
  const [noteDesc, setNoteDesc] = useState("");
  const [listStyle, setListStyle] = useState("-");
  const [fontSize, setFontSize] = useState("18px");
  const [textBold, setTextBold] = useState(false);

  const favoriteEvent = () => {
    setFavorite(!favorite);
    setFavoriteIcon(favorite ? "star-regular.svg" : "star-solid.svg");
  };

  const menuEvent = () => {
    setMenu(!menu);
  };

  const overlayClick = () => {
    setMenu(false);
  };

  const addNote = () => {
    const add = document.getElementById("addNewNote").style;
    const img = document.getElementById("addImg").style;
    const note = document.getElementById("addNewNoteForm").style

    if (addNoteStatus === false) {
      setAddNoteStatus(true);
      img.display = "none";
      add.transition = "1s";
      add.borderRadius = "0";
      add.right = "0";
      add.bottom = "0";
      add.width = "100vw";
      add.height = "100vh";
      add.backgroundColor = "grey";

      setTimeout(() => {
        note.display = "block";
      }, 1000);
    }
  };

  const close = () => {
    const add = document.getElementById("addNewNote").style;
    const img = document.getElementById("addImg").style;
    const note = document.getElementById("addNewNoteForm").style;

    if (addNoteStatus === true) {
      setAddNoteStatus(false);
      img.display = "block";
      add.transition = "0s";
      add.borderRadius = "50%";
      add.right = "30px";
      add.bottom = "30px";
      add.width = "50px";
      add.height = "50px";
      add.backgroundColor = "rgb(72, 255, 0)";
      note.display = "none";
    }
  };

  const handleListTypeChange = (event) => {
    const newStyle = event.target.value;
    const updatedNoteDesc = noteDesc.split('\n').map(line => {
      const trimmedLine = line.replace(new RegExp(`^(${listStyle})\\s*`), '');
      return trimmedLine.trim() === '' ? '' : `${newStyle} ${trimmedLine}`;
    }).join('\n');

    setListStyle(newStyle);
    setNoteDesc(updatedNoteDesc);
  };

  const handleNoteTypeChange = (event) => {
    setNoteType(event.target.value);
    setNoteDesc("");
  };

  const handleNoteDescChange = (event) => {
    let value = event.target.value;
    if(noteType === "List") {
      value = value.split('\n').map(line => {
        if(line.startsWith(listStyle + " ")) {
          line = line.substring(listStyle.length + 1);
        }
        if(line.trim() === '') {
          return '';
        }
        return `${listStyle} ${line}`;
      }).join('\n');
    }
    setNoteDesc(value);
  };

  const handleFontSizeChange = (event) => {
    let size = event.target.value;
    setFontSize(size);
  };

  const handleFontSizeBlur = () => {
    if(!fontSize.includes("px")) {
      setFontSize(fontSize + "px");
    }
  };

  const handleFontSizeFocus = (event) => {
    event.target.select();
  };

  useEffect(() => {
    document.getElementById("noteDesc").style.fontSize = fontSize;
  }, [fontSize]);

  const handleTextBold = () => {
    if(textBold === true) {
      setTextBold(false);
    } else setTextBold(true);
  }

  useEffect(() => {
    if(textBold === true) {
      document.getElementById("noteDesc").style.fontWeight = "Bold";
      document.getElementById("fontWeight").style.background = "rgb(110, 110, 110)";
    } else {
      document.getElementById("noteDesc").style.fontWeight = "";
      document.getElementById("fontWeight").style.background = "grey";
    }
  }, [textBold]);

  return (
    <div>
      <div className="homeHeader">
        <div className='menuIcon' onClick={menuEvent}>
          <img src="bars-solid.svg" alt="Error" />
        </div>
        <input id='search' className='search' type="search" />
        <div className="sortIcon">
          <img src="arrow-up-z-a-solid.svg" alt="Error" />
        </div>
        <div className="favoriteIcon" onClick={favoriteEvent}>
          <img src={favoriteIcon} alt="Error" />
        </div>
      </div>

      <div className='homeBody'>
        
      </div>

      <div className={`sideMenu ${menu ? 'open' : ''}`}>
        <div>Something</div>
      </div>

      <div className={`overlay ${menu ? 'show' : ''}`} onClick={overlayClick}></div>

      <div id='addNewNote' className='addNewNote' onClick={addNote}>
        <img id='addImg' src="plus-solid.svg" alt="Error" />
        <div id="addNewNoteForm">
          <div id='close' onClick={close}>X</div>
          <div id='save'>Save</div>

          <select id="noteType" value={noteType} onChange={handleNoteTypeChange}>
            <option value="Note">Note</option>
            <option value="List">List</option>
          </select>

          <div className='textStyles'>
            {noteType === "List" && (
              <div className='listStyle'>
                <div>List Style</div>
                <select id="listStyle" value={listStyle} onChange={handleListTypeChange}>
                  <option value="-">-</option>
                  <option value="*">*</option>
                  <option value="◾">◾</option>
                </select>
              </div>
            )}
            
            <div className='fontSize'>
              <label>
                Text Size <br />
                <input 
                  onBlur={handleFontSizeBlur} 
                  onChange={handleFontSizeChange}
                  onFocus={handleFontSizeFocus} 
                  value={fontSize} 
                  className='fontSizeInput' 
                  type="text" />
              </label>
            </div>

            <div>
              <div onClick={handleTextBold} id='fontWeight' className="fontWeight">B</div>
            </div>
          </div>

          <div className='note'>
            <input type="text" id="noteName" />
            <textarea id="noteDesc" value={noteDesc} onChange={handleNoteDescChange}></textarea>
          </div>

        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [onClick, setOnClick] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    setOnClick(false); 
    event.preventDefault();
  }

  function handleClick() {
    setOnClick(true);
  }

  return (
    <div>
      <form className="create-note">
        {onClick ? (
          <input
            className="content-title"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoFocus="true"
            style={{fontSize:"130%"}}
          />
        ) : null}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows={onClick ? "3" : "1"}
        />
        {onClick ? <button onClick={submitNote}><AddIcon /></button> : null}
      </form>
    </div>
  );
}

export default CreateArea;

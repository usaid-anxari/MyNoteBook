import NotesContext from "./notesContext";
import { useState } from "react";
const NoteState = (props) => {
  const s1 = {
    "name": "usaid",
    "class": "note",
  };
  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
        setState ({
            "name": "ahmed",
            "class": "Bote",
          });
    }, 1000);
  };
  return (
    <NotesContext.Provider value={{state, update}}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default NoteState;

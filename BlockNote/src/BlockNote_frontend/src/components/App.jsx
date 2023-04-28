import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { BlockNote_backend } from "../../../declarations/BlockNote_backend"

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      BlockNote_backend.createNote(newNote.title, newNote.content);
      return [...prevNotes, newNote];
    });
  }

  fetchData();

  async function fetchData() {
    const notesArray = await BlockNote_backend.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    BlockNote_backend.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

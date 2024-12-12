import React, { useState, useEffect } from "react";
import axios from "axios";

const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/notes/");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create a new note
  const handleCreateNote = async () => {
    try {
      const newNote = { title, content };
      await axios.post("http://127.0.0.1:8000/api/notes/", newNote);
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/notes/${id}/`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes</h1>

      {/* Form to create a new note */}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", width: "300px", height: "100px" }}
        />
        <button onClick={handleCreateNote} style={{ padding: "10px" }}>
          Add Note
        </button>
      </div>

      {/* List of notes */}
      <ul>
        {notes.map((note) => (
          <li key={note.id} style={{ marginTop: "20px" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button
              onClick={() => handleDeleteNote(note.id)}
              style={{ color: "red", padding: "5px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotePage;

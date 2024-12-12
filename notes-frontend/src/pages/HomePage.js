import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('access');
      const response = await axios.get('http://127.0.0.1:8000/api/notes/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>My Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

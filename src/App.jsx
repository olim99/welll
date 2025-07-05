// App.jsx
import { useState, useEffect } from 'react';

const DEFAULT_BOOKS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Book ${i + 1}`,
  author: `Author ${i + 1}`,
}));

export default function App() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [hoveredAuthor, setHoveredAuthor] = useState(null);

  useEffect(() => {
    setBooks(DEFAULT_BOOKS); // начальные 8 карточек
  }, []);

  const addBook = (title, author) => {
    const newBook = {
      id: books.length + 1,
      title,
      author,
    };
    setBooks([...books, newBook]);
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-bold">Library</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Book
      </button>

      {showForm && (
        <AddBookForm
          onAdd={(title, author) => addBook(title, author)}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border rounded bg-gray-100"
          >
            <h2 className="font-semibold">{book.title}</h2>
            <p
              className="text-sm text-gray-700 cursor-pointer"
              onMouseEnter={() => setHoveredAuthor(book.id)}
              onMouseLeave={() => setHoveredAuthor(null)}
            >
              {book.author}
            </p>

            {hoveredAuthor === book.id && (
              <div className="mt-2 p-2 bg-white border rounded shadow text-sm">
                🎨 Это автор: {book.author}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AddBookForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  return (
    <div className="mt-4 p-4 border rounded bg-white shadow-md">
      <h3 className="text-lg font-semibold mb-2">Add New Book</h3>
      <input
        className="block border mb-2 p-1 w-full"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="block border mb-2 p-1 w-full"
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button
        onClick={() => onAdd(title, author)}
        className="bg-green-500 text-white px-4 py-1 mr-2 rounded"
      >
        Add
      </button>
      <button
        onClick={onCancel}
        className="bg-red-500 text-white px-4 py-1 rounded"
      >
        Cancel
      </button>
    </div>
  );
}

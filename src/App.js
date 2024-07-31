// import React, { useState } from 'react';
// import BookForm from './components/BookForm';
// import BookList from './components/BookList';
// import './App.css'; // for styling

// const App = () => {
//   const [books, setBooks] = useState([]);
//   const [currentBook, setCurrentBook] = useState(null);


//   const startEditBook = (index) => {
//     setCurrentBook({ ...books[index], index });
//   };

//   const updateBook = (updatedBook) => {
//     setBooks((prevBooks) => 
//       prevBooks.map((book, i) => (i === updatedBook.index ? updatedBook : book))
//     );
//     setCurrentBook(null);
//   };

//   const addBook = (book) => {
//     setBooks((prevBooks) => [...prevBooks, book]);
//   };

//   const deleteBook = (index) => {
//     setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="App">
//       <h1>Book Store</h1>
      
//       <BookForm addBook={addBook} updateBook={updateBook} currentBook={currentBook} />
//       <BookList books={books} deleteBook={deleteBook} startEditBook={startEditBook} />

//       {/* <BookForm addBook={addBook} />
//       <BookList books={books} deleteBook={deleteBook} /> */}
//     </div>
//   );
// };

// export default App;
//-------------------------------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const startEditBook = (index) => {
    setCurrentBook({ ...books[index], index });
  };

  const updateBook = async (updatedBook) => {
    try {
      await fetch(`http://localhost:8080/api/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
      setBooks((prevBooks) =>
        prevBooks.map((book, i) => (i === updatedBook.index ? updatedBook : book))
      );
      setCurrentBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      const newBook = await response.json();
      setBooks((prevBooks) => [...prevBooks, newBook]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (index) => {
    const book = books[index];
    try {
      await fetch(`http://localhost:8080/api/books/${book.id}`, {
        method: 'DELETE',
      });
      setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="App">
      <h1>Book Store</h1>
      <BookForm addBook={addBook} updateBook={updateBook} currentBook={currentBook} />
      <BookList books={books} deleteBook={deleteBook} startEditBook={startEditBook} />
    </div>
  );
};

export default App;





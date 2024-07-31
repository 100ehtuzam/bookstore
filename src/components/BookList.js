import React from 'react';

const BookList = ({ books, deleteBook, startEditBook }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Book</th>
          <th>Author</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.price}</td>
            <td>{book.quantity}</td>
            <td>
              <button onClick={() => startEditBook(index)}>Update</button>
              <button onClick={() => deleteBook(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;

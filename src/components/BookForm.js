// import React, { useEffect, useState } from 'react';

// const BookForm = ({ addBook,updateBook,currentBook }) => {
//   const [book, setBook] = useState({ name: '', author: '', price: '', quantity: '' });

//   useEffect(()=>{
//     if(currentBook){
//         setBook(currentBook);
//     }else{
//         setBook({
//             name: '',
//             author: '',
//             price: '',
//             quantity: '',
//         });
//     }
//   },[currentBook])

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBook((prev) => ({ 
//         ...prev, 
//         [name]: value,
//      }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (currentBook) {
//         updateBook(book);
//       } else {
//         addBook(book);
//       }
//     // addBook(book);
//     setBook({ 
//         name: '',
//         author: '',
//         price: '',
//         quantity: '',
//      });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="name"
//         value={book.name}
//         onChange={handleChange}
//         placeholder="Enter Book Name"
//         required
//       />
//       <input
//         type="text"
//         name="author"
//         value={book.author}
//         onChange={handleChange}
//         placeholder="Enter Author Name"
//         required
//       />
//       <input
//         type="text"
//         name="price"
//         value={book.price}
//         onChange={handleChange}
//         placeholder="Enter Price"
//         required
//       />
//       <input
//         type="text"
//         name="quantity"
//         value={book.quantity}
//         onChange={handleChange}
//         placeholder="Enter Quantity"
//         required
//       />
//       {/* <button type="submit">Add</button> */}
//       <button type="submit">{currentBook ? 'Update' : 'Add'}</button>
//     </form>
//   );
// };

// export default BookForm;


//___________________________________________________________________________________________________________________________________

import React, { useEffect, useState } from 'react';

const BookForm = ({ addBook, updateBook, currentBook }) => {
  const [book, setBook] = useState({ name: '', author: '', price: '', quantity: '' });
  const [validationMessages, setValidationMessages] = useState({
    name: '',
    author: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    if (currentBook) {
      setBook(currentBook);
    } else {
      setBook({
        name: '',
        author: '',
        price: '',
        quantity: '',
      });
    }
  }, [currentBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidationMessages((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const messages = {};
    if (!book.name) {
      messages.name = 'Title is required';
    } else if (/[^a-zA-Z ]/g.test(book.name)) {
      messages.name = 'Title can only contain alpha characters and spaces';
    }

    if (!book.author) {
      messages.author = 'Author is required';
    } else if (/[^a-zA-Z ]/g.test(book.author)) {
      messages.author = 'Author can only contain alpha characters and spaces';
    }

    if (!book.price || isNaN(book.price) || parseFloat(book.price) <= 0) {
      messages.price = 'Valid price is required';
    } else if (/[^0-9 ]/g.test(book.price)) {
      messages.price = 'Price can only contain numeric values';
    }

    if (!book.quantity || isNaN(book.quantity) || parseInt(book.quantity) <= 0) {
      messages.quantity = 'Valid quantity is required';
    } else if (/[^0-9 ]/g.test(book.quantity)) {
      messages.quantity = 'Quantity can only contain numeric values';
    }

    setValidationMessages(messages);
    return Object.keys(messages).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (currentBook) {
      await updateBook(book);
    } else {
      await addBook(book);
    }
    setBook({
      name: '',
      author: '',
      price: '',
      quantity: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={book.name}
            onChange={handleChange}
            placeholder="Enter Book Title"
            required
          />
          {validationMessages.name && <span className="error">{validationMessages.name}</span>}
        </div>
        <div>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Enter Author Name"
            required
          />
          {validationMessages.author && <span className="error">{validationMessages.author}</span>}
        </div>
        <div>
          <input
            type="text"
            name="price"
            value={book.price}
            onChange={handleChange}
            placeholder="Enter Price"
            required
          />
          {validationMessages.price && <span className="error">{validationMessages.price}</span>}
        </div>
        <div>
          <input
            type="text"
            name="quantity"
            value={book.quantity}
            onChange={handleChange}
            placeholder="Enter Quantity"
            required
          />
          {validationMessages.quantity && <span className="error">{validationMessages.quantity}</span>}
        </div>
        <button type="submit">{currentBook ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default BookForm;

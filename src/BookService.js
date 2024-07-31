// src/api/bookService.js

const API_BASE_URL = 'http://localhost:8080/api';

export const getBooks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/books`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

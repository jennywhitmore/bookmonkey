//main script with the basic functionality for the app
//includes function to initialize the app
//includes function to load all books from the api
//includes functions to navigate around the app

const url = "http://localhost:4730/books/";

// CRUD - API

async function getAllBookes() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

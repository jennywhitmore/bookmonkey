// includes function to add a book to favorites
// includes function to delete a book from favorites
// includes function to load and show the list of favorites

// CRUD Local-Storage

function getFavBooks() {
  return localStorage.getItem("Favourite Books");
}

function addFavBook(data) {
  localStorage.setItem("Favourite Books", data);
}

// function deleteFavBook(isbn) {
//   const data = localStorage.getItem("Favourite Books");
//   filterFavBooks(data, isbn);
// }

// // helper functions

// function filterFavBooks(books, isbn) {
//   return books.filter((x) => x.isbn === isbn);
// }

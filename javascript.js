let myLibrary = [];

function Book() {}

function addBookToLibrary() {}

let addBook = document.getElementById('btn-addBook');
let bookPopup = document.getElementById('book-popup');
let closeForm = document.getElementById('btn-close-form');
let submitBookForm = document.getElementById('btn-submit-book');

addBook.addEventListener('click', () => {
  bookPopup.classList.add('open-book-popup');
});

submitBookForm.addEventListener('click', () => {
  bookPopup.classList.remove('open-book-popup');
});

closeForm.addEventListener('click', () => {
  bookPopup.classList.remove('open-book-popup');
});

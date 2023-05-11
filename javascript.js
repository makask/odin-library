let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.setRead = function (read) {
  this.read = read;
};

let buttonAddBook = document.getElementById('btn-addBook');
let bookPopup = document.getElementById('book-popup');
let closeForm = document.getElementById('btn-close-form');
let submitBookForm = document.getElementById('btn-submit-book');
let submitForm = document.getElementById('add-book-form');

function addBookToLibrary() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read').checked = '';
}

function renderBooks() {
  renderSubmitForm();
  renderFormButtons();
  deleteBook();
}

function renderSubmitForm() {
  let books = document.querySelector('.books-container');
  books.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    books.innerHTML += `<div class="card-item">
      <p>${myLibrary[i].title}</p>
      <p>${myLibrary[i].author}</p>
      <p>${myLibrary[i].pages}</p>
      <button data-id="${i}" class="btn-read"> ${myLibrary[i].read}
      <button data-id="${i}" class="btn-remove-book"> Remove book
      </div>
    `;
  }
}

function renderFormButtons() {
  let readButton = document.querySelectorAll('.btn-read');
  readButton.forEach((item) => {
    item.addEventListener('click', () => {
      let index = item.getAttribute('data-id');
      if (myLibrary[index].read === false) {
        myLibrary[index].setRead(true);
        item.classList.remove('unread');
        item.classList.add('read');
        item.innerHTML = 'Read';
      } else {
        myLibrary[index].setRead(false);
        item.classList.remove('read');
        item.classList.add('unread');
        item.innerHTML = 'Unread';
      }
      renderStats();
    });
    if (item.innerText === 'true') {
      item.classList.add('read');
      item.innerHTML = 'Read';
    } else {
      item.classList.add('unread');
      item.innerHTML = 'Unread';
    }
    renderStats();
  });
}

// Delete book from array
function deleteBook() {
  document.querySelectorAll('.btn-remove-book').forEach((item) => {
    item.addEventListener('click', () => {
      let deleteIndex = item.getAttribute('data-id');
      myLibrary.splice(deleteIndex, 1);
      renderBooks();
      renderStats();
    });
  });
}

buttonAddBook.addEventListener('click', () => {
  bookPopup.classList.add('open-book-popup');
});

// Submit new book
submitBookForm.addEventListener('click', (event) => {
  event.preventDefault();
  submitBookForm.checkValidity();
  bookPopup.classList.remove('open-book-popup');
  addBookToLibrary();
  resetForm();
  renderBooks();
  renderStats();
});

// Render Stats
function renderStats() {
  let books = 0;
  let read = 0;
  let unread = 0;
  let pages = 0;
  let booksTotal = document.getElementById('booksTotal');
  booksTotal.innerHTML = books;
  let readTotal = document.getElementById('readTotal');
  readTotal.innerHTML = read;
  let unreadTotal = document.getElementById('unreadTotal');
  unreadTotal.innerHTML = unread;
  let pagesTotal = document.getElementById('pagesTotal');
  pagesTotal.innerHTML = pages;

  for (let i = 0; i < myLibrary.length; i++) {
    booksTotal.innerHTML = myLibrary.length;
    if (myLibrary[i].read === true) {
      read += 1;
      readTotal.innerHTML = read;
    }
    if (myLibrary[i].read === false) {
      unread += 1;
      unreadTotal.innerHTML = unread;
    }
    pages += Number(myLibrary[i].pages);
    pagesTotal.innerHTML = pages;
  }
  if (read === 0) {
    readTotal.innerHTML = 0;
  }
  if (unread === 0) {
    unreadTotal.innerHTML = 0;
  }
  if (pages === 0) {
    pagesTotal.innerHTML = 0;
  }
  read = 0;
  unread = 0;
  pages = 0;
  if (myLibrary.length == 0) {
    booksTotal.innerHTML = 0;
  }
}

closeForm.addEventListener('click', () => {
  bookPopup.classList.remove('open-book-popup');
});

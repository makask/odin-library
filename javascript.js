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
    });
    if (item.innerText === 'true') {
      item.classList.add('read');
      item.innerHTML = 'Read';
    } else {
      item.classList.add('unread');
      item.innerHTML = 'Unread';
    }
  });
}

function changeReadStatus() {}

function deleteBook() {
  document.querySelectorAll('.btn-remove-book').forEach((item) => {
    item.addEventListener('click', () => {
      let deleteIndex = item.getAttribute('data-id');
      myLibrary.splice(deleteIndex, 1);
      renderBooks();
    });
  });
}

buttonAddBook.addEventListener('click', () => {
  bookPopup.classList.add('open-book-popup');
});

// Submit new book
submitBookForm.addEventListener('click', (event) => {
  event.preventDefault();
  bookPopup.classList.remove('open-book-popup');
  addBookToLibrary();
  resetForm();
  renderBooks();
});

closeForm.addEventListener('click', () => {
  bookPopup.classList.remove('open-book-popup');
});

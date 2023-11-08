// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const myLibrary = [];

// Function to add a book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Function to display books
function displayBooks() {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = '';

  myLibrary.forEach((book, index) => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');

      // Display book information
      bookCard.innerHTML = `
          <p>Title: ${book.title}</p>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Read: ${book.read ? 'Yes' : 'No'}</p>
          <button class="delete-book" data-index="${index}">Delete</button>
          <button class="toggle-read" data-index="${index}">Toggle Read Status</button>
      `;

      mainContent.appendChild(bookCard);
  });

  bindDeleteBook();
  bindToggleReadStatus();
}

// Function to handle the "New Book" button click to show the form
const newBookButton = document.getElementById('newBookButton');
const bookForm = document.getElementById('bookForm');

newBookButton.addEventListener('click', () => {
  bookForm.style.display = 'block';
});

// Function to add new book through the form
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();
  bookForm.style.display = 'none';
  bookForm.reset();
});

// Function to bind delete book buttons
function bindDeleteBook() {
  const deleteButtons = document.querySelectorAll('.delete-book');
  deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          myLibrary.splice(index, 1);
          displayBooks();
      });
  });
}

// Function to bind toggle read status buttons
function bindToggleReadStatus() {
  const toggleButtons = document.querySelectorAll('.toggle-read');
  toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          myLibrary[index].read = !myLibrary[index].read;
          displayBooks();
      });
  });
}

// Example books added to the library
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);

// Initial display of books
displayBooks();

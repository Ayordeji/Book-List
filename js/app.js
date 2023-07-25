// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Declaring UI Variable
const container = document.querySelector(".container"),
  form = document.querySelector("#book-form");

// Event Listener
form.addEventListener("submit", submitBtn);

function submitBtn(e) {
  const title = document.getElementById("title").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;

  // Instantiate UI constructor
  const ui = new UI();

  // Instantiate the Book constructor
  const book = new Book(title, author, isbn);

  // Validate Form input
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Clear fields
    ui.clearFields();

    //Show alert
    ui.showAlert("Book Added!", "success");
  }

  e.preventDefault();
}

// Add Book To List
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;

  list.appendChild(row);
};

// Clear fields Function
UI.prototype.clearFields = function clearFields() {
  document.querySelector("#isbn").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#title").value = "";
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create Div
  const div = document.createElement("div");

  // Add Class Name
  div.className = `alert ${className}`;

  // Add text to Div
  div.appendChild(document.createTextNode(message));

  // Show Element on the FrontEnd
  container.insertBefore(div, form);

  // Set timeout for 3 secs
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});

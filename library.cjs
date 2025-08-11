const config = require('./config.json');

const {
  books,
  users,
  reservations,
  maxBorrowLimit,
  borrowDurationDays
} = config;

const availableBooks = () => books.filter(book => book.available);

const checkBookLimit = users.map((user) => 
  user.borrowedBooks.length >= maxBorrowLimit ? "Limit reached" : "Can borrow more books");

const dueDate = borrowDurationDays * 24 * 60 * 60 * 1000;

const setDueDate = () => {
  const currentDate = new Date().toLocaleDateString();
  const returnDate = new Date(Date.now() + dueDate).toLocaleDateString();
return { 
  CurrentDate: currentDate,
  ReturnDate: returnDate 
}};

const checkBookAvailability = (id) => {
  const book = books.find(book => book.id === id);
  return book.available ? "Available" : "Not Available" ;
};


console.log("List of available books:",availableBooks());
console.log("To check the book limit:",checkBookLimit);
console.log("Setting the due date for user:",setDueDate());
console.log("Checking the book availability:",checkBookAvailability(5));

const config = require('./config.json');

const {
  books,
  users,
  reservations,
  maxBorrowLimit,
  borrowDurationDays
} = config;

const availableBooks = () => books.filter(book => book.available);

const checkBookLimit = (id) => {
  const user = users.find((user) => user.id === id);
    return user.borrowedBooks.length < maxBorrowLimit ? "Can borrow more books" : "Limit reached";
};

const dueDate = borrowDurationDays * 24 * 60 * 60 * 1000;

const setDueDate = () => new Date(Date.now() + dueDate).toLocaleDateString();

const checkBookAvailability = (id) => {
  const book = books.find(book => book.bookId === id);
  return book.available ? "Available" : "Not Available" ;
};

const updatedUser = users.map((user, bookId) => ({
    ...user,
    borrowedBooks: [
      ...user.borrowedBooks,
      { bookId, 
        dueDate: setDueDate()
      }
    ]
}));


const updateBorrowBook = (id, book) => {
  book.available = false
  return users.map((user) => user.id === id ? updatedUser : user);
};

console.log("List of available books:",availableBooks());
console.log("To check the book limit:",checkBookLimit(2019014));
console.log("Checking the book availability:",checkBookAvailability(5));
console.log("Updating the borrow details of the user",JSON.stringify(updateBorrowBook(2019014, 2),null,2));



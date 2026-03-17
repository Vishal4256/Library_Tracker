import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('library_books');
    return saved ? JSON.parse(saved) : [
      { id: Date.now() + 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'finished' },
      { id: Date.now() + 2, title: 'Atomic Habits', author: 'James Clear', status: 'reading' },
      { id: Date.now() + 3, title: '1984', author: 'George Orwell', status: 'unread' }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', status: 'unread' });

  useEffect(() => {
    localStorage.setItem('library_books', JSON.stringify(books));
  }, [books]);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: books.length,
    reading: books.filter(b => b.status === 'reading').length,
    finished: books.filter(b => b.status === 'finished').length
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;
    setBooks([{ ...newBook, id: Date.now() }, ...books]);
    setNewBook({ title: '', author: '', status: 'unread' });
    setIsModalOpen(false);
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">LibTracker</div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Add Book</button>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card glass-panel">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Books</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-value">{stats.reading}</div>
          <div className="stat-label">Currently Reading</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-value">{stats.finished}</div>
          <div className="stat-label">Finished</div>
        </div>
      </div>

      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="book-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card glass-panel">
            <button className="delete-btn" onClick={() => deleteBook(book.id)}>✕</button>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>
            <span className={`book-status status-${book.status}`}>
              {book.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Add New Book</h2>
            <form onSubmit={handleAddBook}>
              <div className="form-group">
                <label>Book Title</label>
                <input 
                  type="text" 
                  value={newBook.title}
                  onChange={e => setNewBook({...newBook, title: e.target.value})}
                  placeholder="Enter title"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input 
                  type="text" 
                  value={newBook.author}
                  onChange={e => setNewBook({...newBook, author: e.target.value})}
                  placeholder="Enter author"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={newBook.status}
                  onChange={e => setNewBook({...newBook, status: e.target.value})}
                >
                  <option value="unread">Unread</option>
                  <option value="reading">Reading</option>
                  <option value="finished">Finished</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Book</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

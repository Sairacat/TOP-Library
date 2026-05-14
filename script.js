'use strict'


const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const isRead = document.querySelector('#status');
const submitBtn = document.querySelector('.submit-btn');
const bookShelf = document.querySelector('.bookshelf');
const bookSheet = document.querySelector('.book-sheet');
const toggleBtn = document.querySelector('.toggle-btn');
const layout = document.querySelector('.layout');
const myLibrary = [];

bookSheet.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    displayBook();
    title.value = '';
    author.value = '';
    pages.value = '';
    isRead.checked = false;
})

toggleBtn.addEventListener('click', () => {
    layout.classList.toggle('layout-change');

})


function Book (title, author, pages, isRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id
}

Book.prototype.isReadToggle = function() {
    this.isRead = this.isRead === false ? true : false;
}


function addBookToLibrary () {
    const newBookTitle = title.value;
    const newBookAuthor = author.value;
    const newBookPages = pages.value;
    const newBookStatus = isRead.checked;
    const newBookId = Math.random().toString(36).slice(2);

    const newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookStatus, newBookId);
    myLibrary.push(newBook);
}

function displayBook () {
    for(let book of myLibrary) {

        const cards = document.querySelectorAll('.card');
        let shouldSkip = false
        for(let card of cards) {
            if(card.id === book.id) {
                shouldSkip = true;
                break
            }
        }

        if(shouldSkip) {
            continue;
        }
        
        const card = document.createElement('div');
        card.id = book.id;
        card.classList.add('card');

        const bookTitle = document.createElement('div');
        bookTitle.textContent = book.title;
        bookTitle.classList.add('booktitle');
        
        const bookAuthor = document.createElement('div');
        bookAuthor.textContent = `By ${book.author}`;
        bookAuthor.classList.add('bookauthor');

        const bookPages = document.createElement('div');
        bookPages.textContent = `${book.pages} pages`;
        bookPages.classList.add('bookpages');

        const statusLabel = document.createElement('div');
        if(book.isRead) {
            statusLabel.textContent = 'Read';
        } else {
            statusLabel.textContent = 'Unfinished';
        }
        statusLabel.classList.add('statuslabel')

        const bookStatus = document.createElement('input');
        bookStatus.type = 'checkbox';
        bookStatus.checked = book.isRead;
        bookStatus.classList.add('bookstatus');
        bookStatus.addEventListener('click', () => {
            book.isReadToggle();
            if(book.isRead) {
            statusLabel.textContent = 'Read';
        } else {
            statusLabel.textContent = 'Unfinished';
        }
        })

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '❌';
        removeBtn.id = book.id;
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            let index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1);
            card.remove();
        })

        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(statusLabel);
        card.appendChild(bookStatus);
        card.appendChild(removeBtn);
        bookShelf.appendChild(card);

    }
}
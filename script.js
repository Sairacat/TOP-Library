'use strict'


const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages')
const isRead = document.querySelector('#status')
const submitBtn = document.querySelector('.submit-btn')
const bookShelf = document.querySelector('.bookshelf')
const bookSheet = document.querySelector('.book-sheet')
const myLibrary = [];

bookSheet.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    displayBook();
})


function Book (title, author, pages, isRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id
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
        
        const card = document.createElement('div');
        card.classList.add('card');

        const bookTitle = document.createElement('div');
        bookTitle.textContent = book.title;
        bookTitle.classList.add('booktitle');
        
        const bookAuthor = document.createElement('div');
        bookAuthor.textContent = `By ${book.author}`;
        bookAuthor.classList.add('bookauthor');

        const bookPages = document.createElement('div');
        bookPages.textContent = book.pages;
        bookPages.classList.add('bookpages');

        const bookStatus = document.createElement('input');
        bookStatus.type = 'checkbox';
        bookStatus.checked = book.isRead;
        bookStatus.classList.add('bookstatus');

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.id = book.id;
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            let cards = document.querySelectorAll('.card');
            for(let book of myLibrary) {
                if(removeBtn.id === book.id) {
                    let index = myLibrary.indexOf(book);
                    myLibrary.splice(index, 1);
                }
            }
            for(let card of cards) {
                if(card.contains(removeBtn)) {
                    bookShelf.removeChild(card)
                }
            }
        })

        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(bookStatus);
        card.appendChild(removeBtn);
        bookShelf.appendChild(card);

    }
}
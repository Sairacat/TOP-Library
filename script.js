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


const titleError = document.querySelector('#title + span');
const authorError = document.querySelector('#author + span');
const pagesError = document.querySelector('#pages + span');

bookSheet.addEventListener('submit', (e) => {
    const hasInvalidControl = !title.validity.valid || !author.validity.valid || !pages.validity.valid

    if(hasInvalidControl) {
        e.preventDefault();
        showErrorMessage()
        return
    }

    e.preventDefault();
    addBookToLibrary();
    displayBook();
    bookSheet.reset();

})

title.addEventListener('input', () => {
    if(title.validity.valid) {
        titleError.textContent = '';
    }else {
        showTitleError();
    }
})

author.addEventListener('input', () => {
    if(author.validity.valid) {
        authorError.textContent = '';
    }else {
        showAuthorError()
    }
})

pages.addEventListener('input', () => {
    if(pages.validity.valid) {
        pagesError.textContent = '';
    }else {
        pagesError.textContent = 'Please enter the number of pages';
    }
})

toggleBtn.addEventListener('click', () => {
    layout.classList.toggle('layout-change');

})



class Book {
    constructor(title, author, pages, isRead, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = id;
    }

    isReadToggle() {
        this.isRead = this.isRead === false ? true : false;
    }
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

function showTitleError() {
    if(title.validity.valueMissing) {
        titleError.textContent = 'Please enter a title';
    }else if(title.validity.patternMismatch) {
        titleError.textContent = 'Numbers are not allowed';
    }
}

function showAuthorError() {
    if(author.validity.valueMissing) {
        authorError.textContent = "Please enter an author's name";
    }else if(author.validity.patternMismatch) {
        authorError.textContent = 'Numbers are not allowed';
    }
}

function showErrorMessage() {
    if(!title.validity.valid) {
        showTitleError()
    }

    if(!author.validity.valid) {
        showAuthorError()
    }

    if(!pages.validity.valid) {
        pagesError.textContent = "Please enter number of pages";
    }
}
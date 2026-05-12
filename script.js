'use strict'


const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages')
const isRead = document.querySelector('#status')
const submitBtn = document.querySelector('.submit-btn')
const myLibrary = [];


function Book (title, author, pages, isRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id
}


function addBookToLibrary () {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;
    const bookStatus = isRead.checked;
    const bookId = Math.random().toString(36).slice(2);

    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus, bookId)
    myLibrary.push(newBook)
}

function displayBook () {
    
}
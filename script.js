'use strict'


const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages')
const isRead = document.querySelector('#status')
const submitBtn = document.querySelector('.submit-btn')
const myLibrary = [];


function Book (title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}


function addBookToLibrary () {

}
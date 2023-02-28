'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import booksJSON from '../assets/books/books.json' assert {type: 'json'}

console.log('booksJSON', booksJSON)

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.vendor))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.maxPrice >= filterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(id = '', priceAmount = 150) {
    return {
        id,
        title: '',
        subtitle: 'mi est eros convallis auctor arcu dapibus himenaeos',
        authors: [
            'Barbara booktland'
        ],
        'publishedDate': 1999,
        'description': 'placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse',
        'pageCount': 713,
        'categories': [
            'Computers',
            'Hack',
        ],
        thumbnail: "http://coding-academy.org/books-photos/20.jpg",
        language: 'en',
        listPrice: {
            amount: priceAmount,
            currencyCode: 'USD',
            isOnSale: false,
        },
    }
}

function addReview(bookId, review) {
    console.log('bookId', bookId)
    console.log('review', review)
    return get(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []
            book.reviews.push(review)
            save(book)
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksJSON
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, price = 250) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    return book
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const carIdx = books.findIndex((currBook) => currBook.id === book.id)
        book.nextBookId = books[carIdx + 1] ? books[carIdx + 1].id : books[0].id
        book.prevBookId = books[carIdx - 1]
            ? books[carIdx - 1].id
            : books[books.length - 1].id
        return book
    })
}
import { bookService } from '../services/book.service.js'

import BookFilter from './BookFilter.js'
import BookList from './BookList.js'

import BookDetails from './BookDetails.js'
import BookEdit from './BookEdit.js'


export default {
    template: `
        <section class="book-index">
            <BookFilter @filter="setFilterBy"/>
            <BookList 
                :books="filteredBooks" 
                v-if="books"
                @remove="removeBook" 
                @show-details="showBookDetails" />
            <BookEdit @book-saved="onSaveBook"/>
            <BookDetails 
                v-if="selectedBook" 
                @hide-details="selectedBook = null"
                :book="selectedBook"/>
        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                })
        },
        showBookDetails(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId)
        },
        onSaveBook(newBook) {
            this.books.push(newBook)
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredBooks() {
            const regex = new RegExp(this.filterBy.title, 'i')
            if (this.filterBy.price) return this.books.filter(book => regex.test(book.title) && book.listPrice.amount >= this.filterBy.price)
            else return this.books.filter(book => regex.test(book.title))
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookFilter,
        BookList,
        BookDetails,
        BookEdit,
    }
}
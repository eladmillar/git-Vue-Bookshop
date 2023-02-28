import { bookService } from "../services/book.service.js"
import AddReview from "../cmps/AddReview.js"


export default {
    template: `
        <section class="book-details" v-if="book">
            <div v-if="this.book.listPrice.isOnSale">
                <img  src="../assets/img/sale.png" alt="">
            </div>
            <h2>{{ book.title }}</h2>
            <h2>By {{book.authors[0]}}</h2>
            <h3>Price: <span :class="bookPrice">{{ book.listPrice.amount }}</span> </h3>
            <p> {{ length }}</p>
            <p v-if="age">{{ age }}</p>
            <img :src="book.thumbnail" alt="">
            <p><span>Description: </span>{{book.description}}</p>
            <nav>
                <RouterLink :to="'/book/' + book.prevBookId">Previous Book</RouterLink> |
                <RouterLink :to="'/book/' + book.nextBookId">Next Book</RouterLink>
                <hr />
                <RouterLink to="/book">Back to list</RouterLink>
            </nav>
            <AddReview />
            <ul class="book-reviews">
                <li v-for="review in book.reviews">
                    <p>Reviewer: {{review.name}} </p>
                    <p>Rating: {{review.rating}} </p>
                    <p>Read: {{review.date}} </p>
                <button @click="removeReview(review.name)">x</button>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            book: null,
            length: null,
            age: null,
            onSale: null,
        }
    },
    created() {
        // console.log('Params:', this.$route.params)
        this.loadBook()
    },
    methods: {
        removeReview(reviewerName) {
            const idx = this.book.reviews.findIndex(review => review.name === reviewerName)
            this.book.reviews.splice(idx, 1)
            bookService.save(this.book)
        },
        checkLength() {
            if (this.book.pageCount > 500) this.length = 'Serious Reading'
            else if (this.book.pageCount > 200) this.length = 'Decent Reading'
            if (this.book.pageCount < 100) this.length = 'Light Reading'
        },
        checkAge() {
            if (2023 - this.book.publishedDate > 10) this.age = 'vintage'
            else if (2023 - this.book.publishedDate < 1) this.age = 'new'
            else this.age = null
        },
        loadBook() {
            bookService.get(this.bookId)
                .then(book => this.book = book)
        },
    },
    computed: {
        bookPrice() {
            return {
                'high-price': this.book.listPrice.amount > 150,
                'low-price': this.book.listPrice.amount < 20,
            }
        },
        bookId() {
            return this.$route.params.bookId
        },
    },
    watch: {
        bookId() {
            console.log('BookId Changed!')
            this.loadBook()
        }
    },
    updated() {
        this.checkLength()
        this.checkAge()
    },
    components: {
        AddReview,
    }
}
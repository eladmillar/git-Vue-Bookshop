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
            <RouterLink to="/book">Back to list</RouterLink>
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
        console.log('Params:', this.$route.params)
        const { bookId } = this.$route.params
        bookService.get(bookId)
            .then(book => {
                this.book = book
                console.log('this.book', this.book)
            })
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
    },
    computed: {
        bookPrice() {
            return {
                'high-price': this.book.listPrice.amount > 150,
                'low-price': this.book.listPrice.amount < 20,
            }
        },
    },
    updated() {
        this.checkLength()
        this.checkAge()
    },
    components: {
        AddReview,
    }
}
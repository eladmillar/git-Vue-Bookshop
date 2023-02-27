import { bookService } from "../services/book.service.js"

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
        closeDetails() {
            this.$emit('hide-details')
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
}
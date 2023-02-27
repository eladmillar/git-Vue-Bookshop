import { bookService } from "../services/book.service.js"

export default {
    template: `
        <section class="add-review">
            <form @submit.prevent="submit()">
                <label for="fullname">Full Name:</label>
                <input type="text" name="fullname" v-model="name" required placeholder="enter name">
                <label for="rating">Choose rating:</label>
                <select id="rating" name="rating" v-model="rating" required>
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
                <label for="submitted">Date submitted:</label>
                <input type="date" id="submitted" name="submitted" v-model="date" required>
                <button>Submit</button>
            </form>
        </section>
    `,
    data() {
        return {
            book: null,
            name: null,
            rating: null,
            date: null,
        }
    },
    created() {
        const { bookId } = this.$route.params
        if (bookId) {
            bookService.get(bookId)
                .then(book => this.book = book)
        }
    },
    methods: {
        submit() {
            const review = {
                name: this.name,
                rating: this.rating,
                date: this.date
            }
            bookService.addReview(this.book.id, review)
        },
    },
    components: {
        bookService
    }
}
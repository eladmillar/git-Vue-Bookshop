import BookPreview from './BookPreview.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <BookPreview :book="book"/>
                    <div class="book-list-buttons">
                        <button @click="showDetails(book.id)">Details</button>
                        <button @click="remove(book.id)">x</button>
                    </div>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
        showDetails(bookId) {
            this.$emit('show-details', bookId)
        },
    },
    components: {
        BookPreview,
    }
}
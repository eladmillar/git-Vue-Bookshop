export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>{{ book.title }}</h2>
            <h2>By {{book.authors[0]}}</h2>
            <h3>Price: {{ book.listPrice.amount }}</h3>
            <img :src="book.thumbnail" alt="">
            <p><span>Description: </span>{{book.description}}</p>
            <button @click="closeDetails">Close</button>
        </section>
    `,
    methods: {
        closeDetails() {
            this.$emit('hide-details')
        }
    }
}
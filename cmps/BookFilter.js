export default {
    template: `
        <section class="book-filter">
            <label>Book name:</label>
            <input 
                v-model="filterBy.title"
                @input="filter" 
                placeholder="Search"
                type="text" />
            <label>Price:</label>
            <input 
                v-model="filterBy.price"
                @input="filter" 
                type="number"
                >
        </section>
    `,
    data() {
        return {
            filterBy: { title: '', price: 0 },
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}
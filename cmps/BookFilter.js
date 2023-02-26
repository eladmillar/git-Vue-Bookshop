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
            <label for="checkbox">Sale</label>
            <input
            v-model="filterBy.isOnSale"
            @input="filter"
            id="checkbox" 
            type="checkbox"
            >    
        </section>
    `,
    data() {
        return {
            filterBy: { title: '', price: 0, isOnSale: false },
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}
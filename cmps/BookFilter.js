export default {
    template: `
        <section class="book-filter">
            <input 
                v-model="filterBy.title"
                @input="filter" 
                placeholder="Search"
                type="text" />
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
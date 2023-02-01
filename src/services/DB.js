export default {
    items : localStorage.items ? JSON.parse(localStorage.items) : [],
    saveItems () {
        localStorage.items = JSON.stringify(this.items);
    },
    getItems () {
        return this.items;
    }
 };
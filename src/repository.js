class Repository {
  constructor() {
    this.data = [
      { id: 1, name: 'Item 1'},
      { id: 2, name: 'Item 2'}
    ];
  }

  getAllItems() {
    return this.data;
  }

  getItemById(id) {
    return this.data.find(item => item.id === id );
  }

  addItem(item) {
    this.data.push(item);
    return item;
  }
  deleteItemById(id) {
    const itemIndex = this.data.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        const deletedItem = this.data.splice(itemIndex, 1)[0];
        return deletedItem; 
    }
    return null;
}
}

module.exports = Repository;
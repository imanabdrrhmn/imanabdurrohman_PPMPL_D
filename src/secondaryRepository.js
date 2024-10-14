class SecondaryRepository {
  constructor() {
    this.data = [
      {id: 3, name: 'Item 3'},
      {id: 4, name: 'Item 4'},
    ];
  }

  getItemById(id) {
    return this.data.find(item => item.id === id );
  }
  deleteItemById(id) {
    const itemIndex = this.data.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        const deletedItem = this.data.splice(itemIndex, 1)[0];
        return deletedItem; // Return the deleted item
    }
    return null; // Return null if item not found
}
}

module.exports = SecondaryRepository;
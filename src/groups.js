class Groups {
  constructor(items) {
    this.items = items
  }

  get keys() {
    return Object.keys(this.items)
  }
}

export default Groups

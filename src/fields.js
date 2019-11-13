class Fields {
  constructor(items) {
    this.items = items
  }

  get keys() {
    return Object.keys(this.items)
  }

  get(sort = true) {
    const fields = []

    for (const item in this.items) {
      fields.push(this.items[item])
    }

    if (sort) {
      return fields.sort((a, b) => {
        return a.weight - b.weight
      })
    }
    return fields

  }
}

export default Fields

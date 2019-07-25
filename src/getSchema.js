class getSchema {
  constructor(entityType, bundle, mode, context) {
    this.entityType = entityType
    this.bundle = bundle
    this.mode = mode
    this.headers = context.root.headers
    this.context = context

    this.schema = {
      fields: {},
      groups: {},
      keys: []
    }
  }

  fieldAdd(field, data) {
    if (!this.fieldExists(field)) {
      this.schema.keys.push(field)
      this.schema.fields[field] = data
    } else {
      // Remove settings, they're merged seperately.
      const settings = data.settings
      delete data.settings

      this.schema.fields[field] = Object.assign(this.schema.fields[field], data)
      this.schema.fields[field].settings = Object.assign(this.schema.fields[field].settings, settings)
    }
  }

  fieldExists(field) {
    return typeof this.schema.fields[field] !== 'undefined'
  }

  groupAdd(group, data) {
    this.schema.groups[group] = data
  }

  process(data) {
    this.validate(data)
    for (const resource of this.resources) {
      resource.process(data[resource.requestId])
    }
  }

  get schemaSorted() {
    return {
      fields: this.sortByWeight(this.schema.fields),
      groups: this.sortByWeight(this.schema.groups),
      keys: this.schema.keys
    }
  }

  sortByWeight(data) {
    const dataArray = []

    for (const item in data) {
      dataArray.push(data[item])
    }

    return dataArray.sort((a, b) => {
      return a.weight - b.weight
    })
  }

  // eslint-disable-next-line no-unused-vars
  validate(data) {}
}

export default getSchema

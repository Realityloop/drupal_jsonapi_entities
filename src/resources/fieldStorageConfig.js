import resourceBase from './resourceBase'

class fieldStorageConfig extends resourceBase {
  get requestId() {
    return `${this.entityType}--field_storage_config`
  }

  get uri() {
    return `/api/field_storage_config/field_storage_config?filter[entity_type]=${this.entityType}`
  }

  get permission() {
    return `administer ${this.entityType} fields`
  }

  validateJson(json) {
    for (const key of ['field_name', 'cardinality', 'settings']) {
      if (typeof json[0][key] === 'undefined') {
        return false
      }
    }
    return true
  }

  processFields(json) {
    const fields = {}

    // @TODO - Validate data.
    for (const fieldStorageConfig of json) {
      const field = fieldStorageConfig.field_name

      fields[field] = {
        id: field,
        cardinality: fieldStorageConfig.cardinality,
        settings: fieldStorageConfig.settings
      }
    }

    return fields
  }
}

export default fieldStorageConfig

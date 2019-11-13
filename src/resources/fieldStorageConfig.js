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

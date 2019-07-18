import requiredResource from './requiredResource'

class fieldStorageConfig extends requiredResource {
  get requestId() {
    return `${this.entityType}--field_storage_config`
  }

  get uri() {
    return `/api/field_storage_config/field_storage_config?filter[entity_type]=${this.entityType}`
  }

  get permission() {
    return `administer ${this.entityType} fields`
  }

  process(data) {
    // @TODO - Validate data.
    for (const fieldStorageConfig of data) {
      const field = fieldStorageConfig.field_name

      // Skip field if it doesn't already exist from Entity Form Display.
      if (!this.schema.fieldExists(field)) continue

      this.schema.fieldAdd(field, {
        cardinality: fieldStorageConfig.cardinality,
        settings: fieldStorageConfig.settings
      })
    }
  }
}

export default fieldStorageConfig

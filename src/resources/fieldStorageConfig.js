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
}

export default fieldStorageConfig

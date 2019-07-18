import requiredResource from './requiredResource'

class fieldConfig extends requiredResource {
  get requestId() {
    return `${this.entityType}--${this.bundle}--field_config`
  }

  get uri() {
    return `/api/field_config/field_config?filter[entity_type]=${this.entityType}&filter[bundle]=${this.bundle}`
  }

  get permission() {
    return `administer ${this.entityType} fields`
  }
}

export default fieldConfig

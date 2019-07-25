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

  process(data) {
    // @TODO - Validate data.
    for (const fieldConfig of data) {
      const field = fieldConfig.field_name

      // Skip field if it doesn't already exist from Entity Form Display.
      if (!this.schema.fieldExists(field)) continue

      this.schema.fieldAdd(field, {
        label: fieldConfig.label,
        description: fieldConfig.description,
        required: fieldConfig.required,
        settings: fieldConfig.settings
      })
    }
  }
}

export default fieldConfig

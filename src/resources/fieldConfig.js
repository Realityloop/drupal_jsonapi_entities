import resourceBase from './resourceBase'

class fieldConfig extends resourceBase {
  get requestId() {
    return `${this.entityType}--${this.bundle}--field_config`
  }

  get uri() {
    return `/api/field_config/field_config?filter[entity_type]=${this.entityType}&filter[bundle]=${this.bundle}`
  }

  get permission() {
    return `administer ${this.entityType} fields`
  }

  processFields(json) {
    const fields = {}

    // @TODO - Validate data.
    for (const fieldConfig of json) {
      const field = fieldConfig.field_name

      fields[field] = {
        id: field,
        property: false,
        label: fieldConfig.label,
        description: fieldConfig.description,
        required: fieldConfig.required,
        settings: fieldConfig.settings
      }
    }

    return fields
  }
}

export default fieldConfig

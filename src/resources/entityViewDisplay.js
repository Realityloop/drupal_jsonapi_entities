import requiredResource from './requiredResource'

class entityViewDisplay extends requiredResource {
  get requestId() {
    return `${this.entityType}--${this.bundle}--${this.mode}--entity_view_display`
  }

  get uri() {
    return `/api/entity_view_display/entity_view_display?filter[drupal_internal__id]=${this.entityType}.${this.bundle}.${this.mode}`
  }

  get permission() {
    return 'administer display modes'
  }

  process(data) {
    // Store data.
    // @TODO - Validate data.
    this.data = data[0]

    // Process fields.
    this.processFields()

    // Process groups.
    this.processGroups()
  }

  processFields() {
    // Iterate over the content region and add fields to schema.
    // @TODO - Add support for regions.
    for (const field in this.data.content) {
      const entityViewDisplay = this.data.content[field]

      this.schema.fieldAdd(field, {
        id: field,
        labelPosition: entityViewDisplay.label,
        type: entityViewDisplay.type,
        weight: entityViewDisplay.weight,

        // Ensure settings are objects, not arrays.
        settings: !Array.isArray(entityViewDisplay.settings)
          ? entityViewDisplay.settings
          : {},

        thirdPartySettings: entityViewDisplay.third_party_settings
      })
    }
  }
}

export default entityViewDisplay

import requiredResource from './requiredResource'

class entityFormDisplay extends requiredResource {
  get requestId() {
    return `${this.entityType}--${this.bundle}--${this.mode}--entity_form_display`
  }

  get uri() {
    return `/api/entity_form_display/entity_form_display?filter[drupal_internal__id]=${this.entityType}.${this.bundle}.${this.mode}`
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
      const entityFormDisplay = this.data.content[field]

      this.schema.fieldAdd(field, {
        id: field,
        type: entityFormDisplay.type,
        // We assume field is a property, and update value as needed in
        // fieldConfig::processFields().
        property: true,
        weight: entityFormDisplay.weight,

        // Ensure settings is an object, not an array.
        settings: !Array.isArray(entityFormDisplay.settings)
          ? entityFormDisplay.settings
          : {},
      })
    }
  }
}

export default entityFormDisplay

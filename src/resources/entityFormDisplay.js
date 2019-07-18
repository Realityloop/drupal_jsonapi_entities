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
    // @TODO - Validate data.
    // @TODO - Add support for regions.
    // @TODO - Add support for groups.
    for (const field in data[0].content) {
      const entityFormDisplay = data[0].content[field]

      this.schema.add(field, {
        id: field,
        type: entityFormDisplay.type,
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

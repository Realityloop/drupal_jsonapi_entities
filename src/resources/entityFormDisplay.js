import resourceBase from './resourceBase'

class entityFormDisplay extends resourceBase {
  get requestId() {
    return `${this.entityType}--${this.bundle}--${this.mode}--entity_form_display`
  }

  get uri() {
    return `/api/entity_form_display/entity_form_display?filter[drupal_internal__id]=${this.entityType}.${this.bundle}.${this.mode}`
  }

  get permission() {
    return 'administer display modes'
  }

  processFields(json) {
    const fields = {}

    // Iterate over the content region and add fields to schema.
    // @TODO - Add support for regions.
    for (const field in json[0].content) {
      const entityFormDisplay = json[0].content[field]

      fields[field] = {
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
      }
    }

    return fields
  }
}

export default entityFormDisplay

import resourceBase from './resourceBase'

class entityViewDisplay extends resourceBase {
  get requestId() {
    return `${this.entityType}--${this.bundle}--${this.mode}--entity_view_display`
  }

  get uri() {
    return `/api/entity_view_display/entity_view_display?filter[drupal_internal__id]=${this.entityType}.${this.bundle}.${this.mode}`
  }

  get permission() {
    return 'administer display modes'
  }

  processFields(json) {
    const fields = {}

    // Iterate over the content region and add fields to schema.
    // @TODO - Add support for regions.)
    for (const field in json[0].content) {
      // eslint-disable-next-line
      const entityViewDisplay = json[0].content[field]

      fields[field] = {
        id: field,
        labelPosition: entityViewDisplay.label,
        type: entityViewDisplay.type,
        weight: entityViewDisplay.weight,

        // Ensure settings are objects, not arrays.
        settings: !Array.isArray(entityViewDisplay.settings)
          ? entityViewDisplay.settings
          : {},

        thirdPartySettings: entityViewDisplay.third_party_settings
      }
    }

    return fields
  }
}

export default entityViewDisplay

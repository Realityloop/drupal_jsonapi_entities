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
    // @TODO - Add support for regions.
    for (const field in json[0].content) {
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

  processGroups(json) {
    if (!json[0].third_party_settings || !json[0].third_party_settings.field_group) return {}

    const groups = {}
    const fields = {}
    for (const groupName in json[0].third_party_settings.field_group) {
      const group = json[0].third_party_settings.field_group[groupName]

      groups[groupName] = {
        id: groupName,
        children: group.children,
        label: group.label,
        weight: group.weight,
        format_type: group.format_type,
        format_settings: group.format_settings
      }

      for (const groupField of group.children) {
        fields[groupField] = { group: groupName }
      }
    }

    return { fields, groups }
  }
}

export default entityViewDisplay

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

  processGroups() {
    if (!this.data.third_party_settings || !this.data.third_party_settings.field_group) return

    const groups = this.data.third_party_settings.field_group
    if (typeof groups !== 'undefined') {
      for (const groupName in groups) {
        const group = groups[groupName]

        this.schema.groupAdd(groupName, {
          id: groupName,
          children: group.children,
          label: group.label,
          weight: group.weight
        })

        for (const groupField of group.children) {
          if (!this.schema.fieldExists(groupField)) continue

          this.schema.fieldAdd(groupField, { group: groupName })
        }
      }
    }
  }
}

export default entityFormDisplay

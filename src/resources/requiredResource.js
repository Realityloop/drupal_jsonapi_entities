class requiredResource {
  constructor(schema) {
    this.schema = schema

    this.entityType = schema.entityType
    this.bundle = schema.bundle
    this.mode = schema.mode
    this.headers = schema.headers
  }

  get action() {
    return 'view'
  }

  get permission() {
    return false
  }

  get subrequest() {
    return {
      requestId: this.requestId,
      uri: this.uri,
      action: this.action,
      headers: this.headers
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

export default requiredResource

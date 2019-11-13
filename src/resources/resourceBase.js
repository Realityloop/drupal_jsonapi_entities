class resourceBase {
  constructor(config) {
    this.entityType = config.entityType
    this.bundle = config.bundle
    this.mode = config.mode || 'default'
    this.headers = config.headers || {}

    this.fields = {}
    this.groups = {}
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

  process(json) {
    // Validate data if callback is available.
    if (typeof this.validateJson === 'function' && !this.validateJson(json)) {
      return false
    }

    // Stub the result object.
    const result = {}

    // Process fields if callback is available.
    if (typeof this.processFields === 'function') {
      this.fields = this.processFields(json)
      result.fields = this.fields
    }

    // Process groups if callback is available.
    if (typeof this.processGroups === 'function') {
      this.groups = this.processGroups(json)
      result.groups = this.groups
    }

    // Return a result, or FALSE if empty.
    if (Object.entries(result).length === 0 && result.constructor === Object) {
      return false
    }
    return result
  }

  // processGroups() {
  //   if (!this.data.third_party_settings || !this.data.third_party_settings.field_group) return
  //
  //   const groups = this.data.third_party_settings.field_group
  //   if (typeof groups !== 'undefined') {
  //     for (const groupName in groups) {
  //       const group = groups[groupName]
  //
  //       this.schema.groupAdd(groupName, {
  //         id: groupName,
  //         children: group.children,
  //         label: group.label,
  //         weight: group.weight
  //       })
  //
  //       for (const groupField of group.children) {
  //         if (!this.schema.fieldExists(groupField)) continue
  //
  //         this.schema.fieldAdd(groupField, { group: groupName })
  //       }
  //     }
  //   }
  // }
}

export default resourceBase

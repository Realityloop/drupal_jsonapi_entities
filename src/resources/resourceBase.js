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
      throw new Error(`Invalid JSON for ${this.requestId}`)
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
      const groupResults = this.processGroups(json)
      if (typeof groupResults.fields === 'object' && typeof result.fields === 'object') {
        for (const groupField in groupResults.fields) {
          Object.assign(result.fields[groupField], groupResults.fields[groupField])
        }
        this.fields = result.fields
      }
      this.groups = result.groups = groupResults.groups
    }

    // Return a result, or FALSE if empty.
    if (Object.entries(result).length === 0 && result.constructor === Object) {
      return false
    }
    return result
  }
}

export default resourceBase

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
}

export default requiredResource

import Fields from './fields'
import Groups from './groups'

import Subrequest from './utils/subrequest'

class schemaBase {
  constructor(config) {
    if (this.constructor === schemaBase) {
      throw new Error('Cannot instantiate Base Class.')
    }

    this.entityType = config.entityType
    this.bundle = config.bundle
    this.mode = config.mode
    this.axios = config.axios

    this.data = null
    this.fields = null
    this.groups = null
  }

  async build() {
    await this.getData()

    // Validate data if callback is available.
    if (typeof this.validate === 'function') this.validate()

    // Process each resource.
    for (const resource of this.resources) {
      // eslint-disable-next-line
      resource.process(this.data[resource.requestId])
    }

    // Process fields if callback is available.
    if (typeof this.processFields === 'function') {
      this.fields = new Fields(this.processFields())
    }

    // Process groups if callback is available.
    if (typeof this.processGroups === 'function') {
      this.groups = new Groups(this.processGroups())
    }
  }

  async getData() {
    const subrequest = new Subrequest(this.axios)
    for (const resource of this.resources) {
      subrequest.requests.push(resource.subrequest)
    }
    this.data = await subrequest.execute()
  }

  get keys() {
    return this.fields.keys
  }
}

export default schemaBase

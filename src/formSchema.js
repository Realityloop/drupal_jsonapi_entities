import schemaBase from './schemaBase'
import entityFormDisplay from './resources/entityFormDisplay'
import fieldConfig from './resources/fieldConfig'
import fieldStorageConfig from './resources/fieldStorageConfig'

class formSchema extends schemaBase {
  constructor(entityType, bundle, mode, context) {
    super(entityType, bundle, mode, context)

    this.resources = [
      new entityFormDisplay(this),
      new fieldConfig(this),
      new fieldStorageConfig(this)
    ]
  }

  validate() {
    const entityFormDisplay = this.data[this.resources[0].requestId]

    if (entityFormDisplay.length === 0) {
      throw new Error(`Entity type invalid: ${this.entityType} ${this.bundle}`)
    }
    return true
  }

  processFields() {
    const fields = {}

    for (const resource of this.resources) {
      for (const field in resource.fields) {
        if (typeof fields[field] === 'undefined' && resource instanceof entityFormDisplay) {
          fields[field] = resource.fields[field]
        }

        else if (typeof fields[field] !== 'undefined') {
          // Remove settings, they're merged seperately.
          const settings = resource.fields[field].settings
          delete resource.fields[field].settings

          fields[field] = Object.assign(fields[field], resource.fields[field])
          fields[field].settings = Object.assign(fields[field].settings, settings)
        }
      }
    }

    return fields
  }

  processGroups() {
    return this.resources[0].groups
  }
}

export default formSchema

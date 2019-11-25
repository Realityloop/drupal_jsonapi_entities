import schemaBase from './schemaBase'

import entityViewDisplay from './resources/entityViewDisplay'
import fieldConfig from './resources/fieldConfig'

class viewSchema extends schemaBase {
  constructor(entityType, bundle, mode, context) {
    super(entityType, bundle, mode, context)

    this.resources = [
      new entityViewDisplay(this),
      new fieldConfig(this)
    ]
  }

  processFields() {
    const fields = {}

    for (const resource of this.resources) {
      for (const field in resource.fields) {
        if (typeof fields[field] === 'undefined' && resource instanceof entityViewDisplay) {
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

export default viewSchema

import getSchema from './getSchema'
import entityFormDisplay from './resources/entityFormDisplay'
import fieldConfig from './resources/fieldConfig'
import fieldStorageConfig from './resources/fieldStorageConfig'

class getFormSchema extends getSchema {
  constructor(entityType, bundle, mode, context) {
    super(entityType, bundle, mode, context)

    this.resources = [
      new entityFormDisplay(this),
      new fieldConfig(this),
      new fieldStorageConfig(this)
    ]
  }

  validate(data) {
    const entityFormDisplay = data[this.resources[0].requestId]
    if (entityFormDisplay.length === 0) {
      throw new Error(`Entity type invalid: ${this.entityType} ${this.bundle}`)
    }
  }
}

export default async (entityType, bundle, mode, context) => {
  const formSchema = new getFormSchema(entityType, bundle, mode, context)

  // Build the subrequests.
  const subrequests = []
  for (const resource of formSchema.resources) {
    subrequests.push(resource.subrequest)
  }

  // Execute the subrequests.
  // @TODO - Make Subrequests a library.
  const subrequestsData = await context.root.getSubrequests(subrequests)

  formSchema.process(subrequestsData)

  return formSchema.schemaSorted
}

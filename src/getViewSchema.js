import getSchema from './getSchema'
import entityViewDisplay from "./resources/entityViewDisplay"
import fieldConfig from './resources/fieldConfig'

class getViewSchema extends getSchema {
  constructor(entityType, bundle, mode, context) {
    super(entityType, bundle, mode, context)

    this.resources = [
      new entityViewDisplay(this),
      new fieldConfig(this)
    ]

  }
}

export default async (entityType, bundle, mode, context) => {
  const viewSchema = new getViewSchema(entityType, bundle, mode, context)

  // Build the subrequests.
  const subrequests = []
  for (const resource of viewSchema.resources) {
    subrequests.push(resource.subrequest)
  }

  // Execute the subrequests.
  // @TODO - Make Subrequests a library.
  const subrequestsData = await context.root.getSubrequests(subrequests)

  viewSchema.process(subrequestsData)

  return viewSchema.schemaSorted
}

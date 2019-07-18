import entityFormDisplay from './resources/entityFormDisplay'
import fieldConfig from './resources/fieldConfig'

class getFormSchema {
  constructor(entityType, bundle, mode, context) {
    this.entityType = entityType
    this.bundle = bundle
    this.mode = mode
    this.headers = context.root.headers
  }

  // Entity form display.
  get entityFormDisplay() {
    return new entityFormDisplay(this).subrequest
  }

  // Field config.
  get fieldConfig() {
    return new fieldConfig(this).subrequest
  }
}

export default async (entityType, bundle, mode, context) => {
  const formSchema = new getFormSchema(entityType, bundle, mode, context)

  // Build the subrequests.
  const subrequests = []
  subrequests.push(formSchema.entityFormDisplay)
  subrequests.push(formSchema.fieldConfig)

  // Execute the subrequests.
  // @TODO - Make Subrequests a library.
  const data = await context.root.getSubrequests(subrequests)

  return data
}

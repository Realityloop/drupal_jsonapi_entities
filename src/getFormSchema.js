import entityFormDisplay from './resources/entityFormDisplay'
import fieldConfig from './resources/fieldConfig'
import fieldStorageConfig from './resources/fieldStorageConfig'

class getFormSchema {
  constructor(entityType, bundle, mode, context) {
    this.entityType = entityType
    this.bundle = bundle
    this.mode = mode
    this.headers = context.root.headers

    this.entityFormDisplay = new entityFormDisplay(this)
    this.fieldConfig = new fieldConfig(this)
    this.fieldStorageConfig = new fieldStorageConfig(this)

    this.schema = {
      fields: {},
      keys: []
    }
  }

  process(data) {
    this.entityFormDisplay.process(data[this.entityFormDisplay.requestId])
    this.fieldConfig.process(data[this.fieldConfig.requestId])
    // this.fieldStorageConfig.process(data[this.fieldStorageConfig.requestId])
  }

  add(field, data) {
    if (typeof this.schema.fields[field] === 'undefined') {
      this.schema.keys.push(field)
      this.schema.fields[field] = data
    } else {
      this.schema.fields[field] = Object.assign(this.schema.fields[field], data)
    }
  }
}

export default async (entityType, bundle, mode, context) => {
  const formSchema = new getFormSchema(entityType, bundle, mode, context)

  // Build the subrequests.
  const subrequests = []
  subrequests.push(formSchema.entityFormDisplay.subrequest)
  subrequests.push(formSchema.fieldConfig.subrequest)
  subrequests.push(formSchema.fieldStorageConfig.subrequest)

  // Execute the subrequests.
  // @TODO - Make Subrequests a library.
  const subrequestsData = await context.root.getSubrequests(subrequests)

  formSchema.process(subrequestsData)

  return formSchema.schema
}

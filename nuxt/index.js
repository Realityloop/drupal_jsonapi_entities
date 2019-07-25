import { resolve } from 'path'
import drupalJSONAPIEntities from '..'

export default async function (options) {
  // Ensure an 'baseUrl' value is set.
  if (typeof options.baseUrl == 'undefined') throw new Error('Drupal JSON:API Entities requires the modules \'baseUrl\' to be set.')

  // Set the URL and remove it from the options object.
  const url = options.baseUrl
  delete options.baseUrl

  // Ensure a list of entities/bundles is set.
  // @TODO - Fallback to get all?
  if (typeof this.options.drupalJSONAPIEntities == 'undefined') throw new Error('The Drupal JSON:API Entities module requires a \'drupalJSONAPIEntities\' entry in nuxt.config.js.')
  const entities = this.options.drupalJSONAPIEntities

  // Construct the Drupal JSON:API Entities class.
  // eslint-disable-next-line
  const drupalEntities = new drupalJSONAPIEntities(url, options)

  // Iterate over entities and build up schemas.
  const schemas = {}
  for (const entityType in entities) {
    schemas[entityType] = {}

    const entityTypeBundles = entities[entityType]
    for (const bundle of entityTypeBundles) {
      schemas[entityType][bundle] = await drupalEntities.getFormSchema(entityType, bundle)
    }
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.template.js'),
    options: { schemas }
  })
}

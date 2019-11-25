import { resolve } from 'path'
import drupalJSONAPIEntities from '..'

export default async function (options = {}) {
  // Ensure an 'baseUrl' value is set.
  if (typeof options.baseUrl == 'undefined') throw new Error('Drupal JSON:API Entities requires the modules \'baseUrl\' to be set.')

  // Set the URL and remove it from the options object.
  const url = options.baseUrl
  delete options.baseUrl

  // Ensure a list of entities/bundles is set.
  // @TODO - Fallback to get all?
  if (typeof this.options == 'undefined' || typeof this.options.drupalJSONAPIEntities == 'undefined') throw new Error('The Drupal JSON:API Entities module requires a \'drupalJSONAPIEntities\' entry in nuxt.config.js.')
  const entities = this.options.drupalJSONAPIEntities

  // Construct the Drupal JSON:API Entities class.
  const drupalEntities = new drupalJSONAPIEntities(url, options)

  // Iterate over entities and build up schemas.
  const schemas = {}
  for (const entityType in entities) {
    schemas[entityType] = {}

    let entityTypeBundles = entities[entityType]

    // If Bundles are an array, change to an object and set default types.
    if (Array.isArray(entityTypeBundles)) {
      entityTypeBundles = {}
      for (const bundle of entities[entityType]) {
        entityTypeBundles[bundle] = {
          form: ['default'],
          view: ['default']
        }
      }
      entities[entityType] = { ...entityTypeBundles }
    }

    // Iterate over bundles.
    for (const bundle in entityTypeBundles) {
      schemas[entityType][bundle] = {}

      // If Schema types are an array, change to an object and set default modes.
      if (Array.isArray(entityTypeBundles[bundle])) {
        entityTypeBundles[bundle] = {}

        // Ensure valid Schema types configuration.
        if (!Array.isArray(entities[entityType][bundle])) {
          throw new Error('Drupal JSON:API Entitites: Invalid Schema types configuration.')
        }

        for (const schemaType of entities[entityType][bundle]) {
          entityTypeBundles[bundle][schemaType] = ['default']
        }
        entities[entityType][bundle] = { ...entityTypeBundles[bundle] }
      }

      // Iterate over types.
      for (const type of ['form', 'view']) {
        if (typeof entityTypeBundles[bundle][type] === 'undefined') continue
        schemas[entityType][bundle][type] = {}

        // Iterate over modes.
        const modes = entityTypeBundles[bundle][type]
        for (const mode of modes) {

          // Build schema data and add to results.
          const method = type === 'form' ? 'getFormSchema' : 'getViewSchema'
          const schema = await drupalEntities[method](entityType, bundle, mode)
          schemas[entityType][bundle][type][mode] = {
            fields: schema.fields.items,
            groups: schema.groups.items
          }
        }
      }
    }
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.template.js'),
    fileName: 'drupalJSONAPIEntities.js',
    options: { schemas }
  })
}

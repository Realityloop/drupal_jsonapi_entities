import { Deserializer } from 'jsonapi-serializer'

import fieldStorageConfig from '../fieldStorageConfig'
import jsonData from '../__fixtures__/field_storage_config'

const schema = {
  entityType: 'node',
  bundle: 'article',
  mode: 'default',
  headers: {},
  fields: {},
  fieldAdd: (field, config) => schema.fields[field] = config,
  fieldExists: () => false
}
const resource = new fieldStorageConfig(schema)

describe('Field storage config', () => {
  test('Resource', () => {
    const subrequest = {
      requestId: 'node--field_storage_config',
      uri: '/api/field_storage_config/field_storage_config?filter[entity_type]=node',
      action: 'view',
      headers: {}
    }

    expect(resource.requestId).toBe(subrequest.requestId)
    expect(resource.uri).toBe(subrequest.uri)
    expect(resource.action).toBe(subrequest.action)
    expect(resource.subrequest).toStrictEqual(subrequest)

    expect(resource.permission).toBe('administer node fields')
  })

  test('Process', async () => {
    // Prepare mock data.
    const deserializer = new Deserializer({
      keyForAttribute: 'underscore_case'
    })
    const data = await deserializer.deserialize(jsonData)

    // Process mock data.
    resource.process(data)

    // Assert that no fields processed due to missing field data from
    // unprocessed entityFormDisplay resource.
    expect(schema.fields).toStrictEqual({})

    // Process data as if entityFormDisplay has been processed.
    schema.fieldExists = () => true
    resource.process(data)

    // Assert body field schema.
    expect(schema.fields.body).toStrictEqual({
      cardinality: 1,
      settings: []
    })
  })
})

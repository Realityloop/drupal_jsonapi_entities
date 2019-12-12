import deserialize from '../../utils/deserialize'
import fieldStorageConfig from '../fieldStorageConfig'
import json from '../__fixtures__/field_storage_config'

const resource = new fieldStorageConfig({
  entityType: 'node',
  bundle: 'recipe',
  mode: 'default',
})

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
    // Test JSON validation.
    expect(() => { resource.process([{}]) }).toThrow('Invalid JSON for node--field_storage_config')

    // Deserialize mock data.
    const deserializedJson = await deserialize(json)

    // Process mock data.
    expect(resource.process(deserializedJson)).not.toBe(false)

    // Check for valid results.
    expect(resource.fields.field_ingredients).toStrictEqual({
      cardinality: -1,
      id: 'field_ingredients',
      settings: {
        case_sensitive: false,
        is_ascii: false,
        max_length: 255,
      }
    })
  })
})

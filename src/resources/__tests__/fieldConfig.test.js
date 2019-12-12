import deserialize from "../../utils/deserialize";
import fieldConfig from '../fieldConfig'
import json from '../__fixtures__/field_config'

const resource = new fieldConfig({
  entityType: 'node',
  bundle: 'recipe',
  mode: 'default',
})

describe('Field config', () => {
  test('Resource', () => {
    const subrequest = {
      requestId: 'node--recipe--field_config',
      uri: '/api/field_config/field_config?filter[entity_type]=node&filter[bundle]=recipe',
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
    expect(() => { resource.process([{}]) }).toThrow('Invalid JSON for node--recipe--field_config')

    // Deserialize mock data.
    const deserializedJson = await deserialize(json)

    // Process mock data.
    expect(resource.process(deserializedJson)).not.toBe(false)

    // Check for valid results.
    expect(resource.fields.field_ingredients).toStrictEqual({
      description: 'List the ingredients required for this recipe, one per item.',
      id: 'field_ingredients',
      label: 'Ingredients',
      property: false,
      required: false,
      settings: [],
    })
  })
})

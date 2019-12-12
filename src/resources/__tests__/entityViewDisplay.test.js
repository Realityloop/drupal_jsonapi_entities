import deserialize from '../../utils/deserialize'
import entityViewDisplay from '../entityViewDisplay'
import json from '../__fixtures__/entity_view_display'

const resource = new entityViewDisplay({
  entityType: 'node',
  bundle: 'recipe',
  mode: 'default',
})

describe('Entity view display', () => {
  test('Resource', () => {
    const subrequest = {
      requestId: 'node--recipe--default--entity_view_display',
      uri: '/api/entity_view_display/entity_view_display?filter[drupal_internal__id]=node.recipe.default',
      action: 'view',
      headers: {}
    }
    expect(resource.requestId).toBe(subrequest.requestId)
    expect(resource.uri).toBe(subrequest.uri)
    expect(resource.action).toBe(subrequest.action)
    expect(resource.subrequest).toStrictEqual(subrequest)
    expect(resource.permission).toBe('administer display modes')
  })

  test('Process', async () => {
    // Test JSON validation.
    expect(() => { resource.process([{ content: { test: {} } }]) }).toThrow('Invalid JSON for node--recipe--default--entity_view_display')

    // Deserialize mock data.
    const deserializedJson = await deserialize(json)

    // Process mock data.
    expect(resource.process(deserializedJson)).not.toBe(false)

    // Check for valid results.
    expect(resource.fields.field_ingredients).toStrictEqual({
      id: 'field_ingredients',
      labelPosition: 'above',
      settings: {
        link_to_entity: false,
      },
      thirdPartySettings: [],
      type: 'string',
      weight: 4,
    })
  })
})
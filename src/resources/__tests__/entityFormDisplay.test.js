import deserialize from '../../utils/deserialize'
import entityFormDisplay from '../entityFormDisplay'
import json from "../__fixtures__/entity_form_display";

const resource = new entityFormDisplay({
  entityType: 'node',
  bundle: 'recipe',
  mode: 'default',
})

describe('Entity form display', () => {
  test('Resource', () => {
    const subrequest = {
      requestId: 'node--recipe--default--entity_form_display',
      uri: '/api/entity_form_display/entity_form_display?filter[drupal_internal__id]=node.recipe.default',
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
    // Deserialize mock data.
    const deserializedJson = await deserialize(json)

    // Process mock data.
    expect(resource.process(deserializedJson)).not.toBe(false)

    // Check for valid results.
    expect(resource.fields.field_ingredients).toStrictEqual({
      id: 'field_ingredients',
      property: true,
      settings: {
        placeholder: '',
        size: 60,
      },
      type: 'string_textfield',
      weight: 10,
    })
  })
})
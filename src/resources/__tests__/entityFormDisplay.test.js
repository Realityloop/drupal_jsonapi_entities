import { Deserializer } from "jsonapi-serializer";

import entityFormDisplay from '../entityFormDisplay'
import jsonData from '../__fixtures__/entity_form_display'

const schema = {
  entityType: 'node',
  bundle: 'article',
  mode: 'default',
  headers: {},
  fields: {},
  fieldAdd: (field, config) => schema.fields[field] = config
}
const resource = new entityFormDisplay(schema)

describe('Resource: Entity form, display', () => {
  test('Subrequest', () => {
    const subrequest = {
      requestId: 'node--article--default--entity_form_display',
      uri: '/api/entity_form_display/entity_form_display?filter[drupal_internal__id]=node.article.default',
      action: 'view',
      headers: {}
    }

    expect(resource.requestId).toBe(subrequest.requestId)
    expect(resource.uri).toBe(subrequest.uri)
    expect(resource.action).toBe(subrequest.action)
    expect(resource.subrequest).toStrictEqual(subrequest)
  })

  test('Process', async () => {
    // Prepare mock data.
    const deserializer = new Deserializer({
      keyForAttribute: 'underscore_case'
    })
    const data = await deserializer.deserialize(jsonData)

    // Process mock data.
    resource.process(data)

    // Assert body field schema.
    expect(schema.fields.body).toStrictEqual({
      id: 'body',
      type: 'text_textarea_with_summary',
      property: true,
      weight: 1,
      settings: {
        rows: 9,
        summary_rows: 3,
        placeholder: ''
      }
    })
  })
})
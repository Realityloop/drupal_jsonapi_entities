import viewSchema from '../viewSchema'

import mockEntityViewDisplay from '../resources/__fixtures__/entity_view_display'
import mockFieldConfig from '../resources/__fixtures__/field_config'

const entityType = 'node'
const bundle = 'recipe'
const mode = 'default'

const mockAxios = {
  post: () => ({
    data: {
      'node--recipe--default--entity_view_display': { body: JSON.stringify(mockEntityViewDisplay) },
      'node--recipe--field_config': { body: JSON.stringify(mockFieldConfig) }
    }
  })
}

test('viewSchema', async () => {
  const schema = new viewSchema({ entityType, bundle, mode, axios: mockAxios })
  await schema.build()

  expect(schema.fields.items).toMatchSnapshot()
  expect(schema.keys).toMatchSnapshot()
  expect(schema.fields.get()).toMatchSnapshot()
  expect(schema.fields.get(false)).toMatchSnapshot()
})
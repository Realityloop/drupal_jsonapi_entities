import formSchema from '../formSchema'

import mockEntityFormDisplay from '../resources/__fixtures__/entity_form_display'
import mockFieldConfig from '../resources/__fixtures__/field_config'
import mockFieldStorageConfig from '../resources/__fixtures__/field_storage_config'

const entityType = 'node'
const bundle = 'recipe'
const mode = 'default'

const mockAxios = {
  post: () => ({
    data: {
      'node--recipe--default--entity_form_display': { body: JSON.stringify(mockEntityFormDisplay) },
      'node--recipe--field_config': { body: JSON.stringify(mockFieldConfig) },
      'node--field_storage_config': { body: JSON.stringify(mockFieldStorageConfig) }
    }
  })
}

test('formSchema', async () => {
  const schema = new formSchema({ entityType, bundle, mode, axios: mockAxios })
  await schema.build()

  expect(schema.fields.items).toMatchSnapshot()
  expect(schema.keys).toMatchSnapshot()
  expect(schema.fields.get()).toMatchSnapshot()
  expect(schema.fields.get(false)).toMatchSnapshot()
})

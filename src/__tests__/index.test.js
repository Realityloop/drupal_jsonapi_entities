import axios from 'axios'
import drupalJSONAPIEntities from '..'

import mockEntityFormDisplay from '../resources/__fixtures__/entity_form_display'
import mockEntityViewDisplay from '../resources/__fixtures__/entity_view_display'
import mockFieldConfig from '../resources/__fixtures__/field_config'
import mockFieldStorageConfig from '../resources/__fixtures__/field_storage_config'

// Setup mock axios module.
jest.mock('axios')
const axiosMock = mockData => {
  axios.create.mockReturnValue({
    interceptors: { request: { use: () => { } } },
    post: () => ({ data: mockData })
  })
}

const baseURL = 'https://example.com'

describe('drupalJSONAPIEntities', () => {
  test('constructor', () => {
    axiosMock({})

    // Throw error if 'baseURL' not provided.
    expect(() => { new drupalJSONAPIEntities() }).toThrow('The \'baseURL\' parameter is required.')

    // Ensure class type.
    expect(new drupalJSONAPIEntities(baseURL)).toBeInstanceOf(drupalJSONAPIEntities)
  })

  test('getFormSchema', async () => {
    axiosMock({
      'node--recipe--default--entity_form_display': { body: JSON.stringify(mockEntityFormDisplay) },
      'node--recipe--field_config': { body: JSON.stringify(mockFieldConfig) },
      'node--field_storage_config': { body: JSON.stringify(mockFieldStorageConfig) }
    })
    const instance = new drupalJSONAPIEntities(baseURL)

    const schema = await instance.getFormSchema('node', 'recipe')
    expect(schema.fields.items).toMatchSnapshot()
    expect(schema.groups.items).toMatchSnapshot()
    expect(schema.keys).toMatchSnapshot()
  })

  test('getViewSchema', async () => {
    axiosMock({
      'node--recipe--default--entity_view_display': { body: JSON.stringify(mockEntityViewDisplay) },
      'node--recipe--field_config': { body: JSON.stringify(mockFieldConfig) }
    })
    const instance = new drupalJSONAPIEntities(baseURL)

    const schema = await instance.getViewSchema('node', 'recipe')
    expect(schema.fields.items).toMatchSnapshot()
    expect(schema.groups.items).toMatchSnapshot()
    expect(schema.keys).toMatchSnapshot()
  })
})

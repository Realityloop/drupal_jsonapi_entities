import axios from 'axios'
import drupalJSONAPIEntities from '..'
import getFormSchema from '../__fixtures__/getFormSchema'

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
  axiosMock({})

  test('constructor', () => {
    // Throw error if 'baseURL' not provided.
    expect(() => { new drupalJSONAPIEntities() }).toThrow('The \'baseURL\' parameter is required.')

    // Ensure class type.
    expect(new drupalJSONAPIEntities(baseURL)).toBeInstanceOf(drupalJSONAPIEntities)
  })

  test('getFormSchema', async () => {
    axiosMock(getFormSchema)

    const entities = new drupalJSONAPIEntities(baseURL)
    const schema = await entities.getFormSchema('node', 'recipe')
    expect(schema).toHaveProperty('fields')
  })

  test('getSubrequests', async () => {
    // Test subrequest error.
    axiosMock({
      test: {
        body: JSON.stringify({
          errors: [{
            status: 500,
            title: 'Test error',
            detail: 'Test failed successfully'
          }]
        })
      }
    })
    try {
      await new drupalJSONAPIEntities(baseURL).getSubrequests({})
    } catch (err) {
      expect(err.message).toBe('500 Test error: Test failed successfully')
    }

    // Test permission errors.
    axiosMock({
      test: {
        body: JSON.stringify({
          meta: {
            omitted: {
              detail: 'Test permission error'
            }
          }
        })
      }
    })
    try {
      await new drupalJSONAPIEntities(baseURL).getSubrequests({})
    } catch (err) {
      expect(err.message).toBe('Test permission error')
    }
  })
})

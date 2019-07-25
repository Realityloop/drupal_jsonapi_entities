import drupalJSONAPIEntities from '.'

const baseURL = 'https://example.com'

test('drupalJSONAPIEntities', async () => {
  // Throw error if 'baseURL' not provided.
  expect(() => { new drupalJSONAPIEntities() }).toThrow('The \'baseURL\' parameter is required.')
  expect(new drupalJSONAPIEntities(baseURL)).toBeInstanceOf(drupalJSONAPIEntities)
})

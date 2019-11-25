import schemaBase from '../schemaBase'

const entityType = 'node'
const bundle = 'recipe'
const mode = 'default'

describe('schemaBase', () => {
  test('constructor', () => {
    expect(() => { new schemaBase({ entityType, bundle, mode, axios: {} }) }).toThrow('Cannot instantiate Base Class.')
  })
})

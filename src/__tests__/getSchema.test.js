import getSchema from '../getSchema'

const entityType = 'node'
const bundle = 'article'
const mode = 'default'
const context = {
  root: { headers: {} }
}

describe('getSchema', () => {
  test('constructor', () => {
    const schema = new getSchema(entityType, bundle, mode, context)

    expect(schema.entityType).toBe('node')
    expect(schema.bundle).toBe('article')
    expect(schema.mode).toBe('default')
    expect(schema.headers).toStrictEqual({})

    // Add mock resource and test processing.
    schema.resources = [{
      requestId: 'test',
      process: data => {
        expect(data).toStrictEqual({ process: true })
      }
    }]
    schema.process({ test: { process: true} })
  })

  test('fields', () => {
    const schema = new getSchema(entityType, bundle, mode, context)

    // Assert 'fieldExists' returns false as no fields added.
    expect(schema.fieldExists('test')).toBe(false)

    // Add test field and assert 'fieldExists' returns true.
    schema.fieldAdd('test', { settings: { test: 1 }})
    expect(schema.fieldExists('test')).toBe(true)
    expect(schema.schema.fields.test).toStrictEqual({ settings: { test: 1 } })

    // Update field with new settings.
    schema.fieldAdd('test', { settings: { test: 2 } })
    expect(schema.schema.fields.test).toStrictEqual({ settings: { test: 2 } })
  })

  test('groups', () => {
    const schema = new getSchema(entityType, bundle, mode, context)

    schema.groupAdd('test', {})
    expect(schema.schema.groups.test).toStrictEqual({})
  })

  test('schemaSorted', () => {
    const schema = new getSchema(entityType, bundle, mode, context)

    // Test sorted schema with no fields or groups.
    expect(schema.schemaSorted).toStrictEqual({
      fields: [],
      groups: [],
      keys: []
    })

    // Test with added fields.
    schema.fieldAdd(1, { id: 1, weight: 2 })
    schema.fieldAdd(2, { id: 2, weight: 1 })
    schema.fieldAdd(3, { id: 3, weight: 3 })
    expect(schema.schemaSorted).toStrictEqual({
      fields: [{ id: 2, weight: 1 }, { id: 1, weight: 2 }, { id: 3, weight: 3 }],
      groups: [],
      keys: [1, 2, 3]
    })
  })

  test('sortByWeight', () => {
    const schema = new getSchema(entityType, bundle, mode, context)
    const items = [{ id: 1, weight: 2 }, { id: 2, weight: 1 }, { id: 3, weight: 3 }]

    expect(schema.sortByWeight(items)).toStrictEqual([
      { id: 2, weight: 1 },
      { id: 1, weight: 2 },
      { id: 3, weight: 3 }
    ])
  })
})

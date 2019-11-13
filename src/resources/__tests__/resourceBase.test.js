import resourceBase from '../resourceBase'

const resource = new resourceBase({
  entityType: 'node',
  bundle: 'recipe',
})

test('Required resource', () => {
  // Test basics.
  expect(resource.entityType).toBe('node')
  expect(resource.bundle).toBe('recipe')
  expect(resource.mode).toBe('default')
  expect(resource.headers).toStrictEqual({})
  expect(resource.action).toBe('view')
  expect(resource.permission).toBe(false)
  expect(resource.subrequest).toStrictEqual({
    action: 'view',
    headers: {},
    requestId: undefined,
    uri: undefined
  })

  // Test 'process' with no callbacks or data.
  expect(resource.process()).toBe(false)
  expect(resource.fields).toStrictEqual({})
  expect(resource.groups).toStrictEqual({})

  // Test 'process' with false validation callback.
  resource.validateJson = () => false
  expect(resource.process()).toBe(false)

  // Test 'process' with custom callbacks and data.
  resource.validateJson = () => true
  resource.processFields = json => json.fields
  resource.processGroups = json => json.groups
  expect(resource.process({ fields: true, groups: true})).toStrictEqual({
    fields: true,
    groups: true
  })
  expect(resource.fields).toBe(true)
  expect(resource.groups).toBe(true)
})

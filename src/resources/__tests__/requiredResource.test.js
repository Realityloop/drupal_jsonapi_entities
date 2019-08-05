import requiredResource from '../requiredResource'

const schema = {
  entityType: 'node',
  bundle: 'article',
  mode: 'default',
  headers: {}
}
const resource = new requiredResource(schema)


test('Required resource', () => {
  expect(resource.action).toBe('view')
  expect(resource.permission).toBe(false)

  expect(resource.subrequest).toStrictEqual({
    action: 'view',
    headers: {},
    requestId: undefined,
    uri: undefined
  })
})

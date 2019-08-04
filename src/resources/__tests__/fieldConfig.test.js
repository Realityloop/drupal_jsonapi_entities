import fieldConfig from '../fieldConfig'

const schema = {
  entityType: 'node',
  bundle: 'article',
  mode: 'default',
  headers: {}
}
const resource = new fieldConfig(schema)

test('Resource: Field config', () => {
  const subrequest = {
    requestId: 'node--article--field_config',
    uri: '/api/field_config/field_config?filter[entity_type]=node&filter[bundle]=article',
    action: 'view',
    headers: {}
  }

  expect(resource.requestId).toBe(subrequest.requestId)
  expect(resource.uri).toBe(subrequest.uri)
  expect(resource.action).toBe(subrequest.action)
  expect(resource.subrequest).toStrictEqual(subrequest)
})

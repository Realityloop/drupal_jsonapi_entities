import fieldStorageConfig from '../fieldStorageConfig'

const schema = {
  entityType: 'node',
  bundle: 'article',
  mode: 'default',
  headers: {}
}
const resource = new fieldStorageConfig(schema)

test('Resource: Field storage config', () => {
  const subrequest = {
    requestId: 'node--field_storage_config',
    uri: '/api/field_storage_config/field_storage_config?filter[entity_type]=node',
    action: 'view',
    headers: {}
  }

  expect(resource.requestId).toBe(subrequest.requestId)
  expect(resource.uri).toBe(subrequest.uri)
  expect(resource.action).toBe(subrequest.action)
  expect(resource.subrequest).toStrictEqual(subrequest)
})

import entityFormDisplay from '../entityFormDisplay'

const schema = {
  entityType: 'node',
  bundle: 'article',
  mode: 'default',
  headers: {}
}
const resource = new entityFormDisplay(schema)

test('Resource: Entity form display', () => {
  const subrequest = {
    requestId: 'node--article--default--entity_form_display',
    uri: '/api/entity_form_display/entity_form_display?filter[drupal_internal__id]=node.article.default',
    action: 'view',
    headers: {}
  }

  expect(resource.requestId).toBe(subrequest.requestId)
  expect(resource.uri).toBe(subrequest.uri)
  expect(resource.action).toBe(subrequest.action)
  expect(resource.subrequest).toStrictEqual(subrequest)
})

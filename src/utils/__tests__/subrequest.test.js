import Subrequest from '../subrequest'

// Setup mock axios post callback.
const axios = data => ({
  post: () => data
})

test('Subrequest', async () => {
  // Throw error if 'axios' not provided.
  expect(() => { new Subrequest() }).toThrow('Axios is required.')

  // Test error when resource is unavailable (404).
  const response = {
    data: {
      resource: {
        body: '<html />',
        headers: {
          status: [ 404 ]
        }
      }
    }
  }
  let subrequest = new Subrequest(axios(response))
  try {
    await subrequest.execute()
  } catch (err) {
    expect(err.message).toBe('404: Invalid data for resource, ensure resource is available.')
  }

  // Test JSON API error.
  const resource = {
    data: { attributes: {} },
    errors: [{ status: 500, title: 'Error', detail: 'Error message.' }]
  }
  response.data.resource = { body: JSON.stringify(resource) }

  subrequest = new Subrequest(axios(response))
  try {
    await subrequest.execute()
  } catch (err) {
    expect(err.message).toBe('500: Error: Error message.')
  }

  // Test permission error.
  delete resource.errors
  resource.meta = { omitted: {
    detail: 'Error: Some resources have been omitted because of insufficient authorization.',
    links: {
      test1: { 
        meta: {
          detail: 'The current user is not allowed to GET the selected resource. The \'administer display modes\' permission is required.'
        }
      },
      test2: {} 
    }
  } }
  response.data.resource = { body: JSON.stringify(resource) }

  subrequest = new Subrequest(axios(response))
  try {
    await subrequest.execute()
  } catch (err) {
    expect(err.message).toBe(`${resource.meta.omitted.detail}\n\n${resource.meta.omitted.links.test1.meta.detail}`)
  }
})

import Subrequest from '../subrequest'

test('Subrequest', async () => {
  // Throw error if 'axios' not provided.
  expect(() => { new Subrequest() }).toThrow('Axios is required.')
})

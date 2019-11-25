// Setup JSON API Deserializer.
import { Deserializer } from 'jsonapi-serializer'

const deserializer = new Deserializer({
  keyForAttribute: 'underscore_case'
})

export default async data => {
  const result = await deserializer.deserialize(data)
  return result
}

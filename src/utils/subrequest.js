import deserialze from './deserialize'

class Subrequest {
  constructor(config) {
    this.axios = config.axios
    this.requests = []
  }

  async execute() {
    // @TODO - Validate results.
    //   - Ensure expected resource type is returned.
    const results = await this.axios.post('subrequests?_format=json', this.requests)

    for (const subrequest in results.data) {
      const result = JSON.parse(results.data[subrequest].body)

      // If error, throw error.
      if (typeof result.errors !== 'undefined') {
        throw new Error(`${result.errors[0].status} ${result.errors[0].title}: ${result.errors[0].detail}`)
      }

      // Throw error if any items are omitted.
      // @TODO - Add better error handiling.
      // - Display information about required permissions.
      if (result.meta && typeof result.meta.omitted !== 'undefined') {
        throw new Error(result.meta.omitted.detail)
      }

      results.data[subrequest] = await deserialze(result)
    }

    return results.data
  }
}

export default Subrequest

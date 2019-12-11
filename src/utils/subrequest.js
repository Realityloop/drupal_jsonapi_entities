import deserialze from './deserialize'

class Subrequest {
  constructor(axios) {
    if (typeof axios === 'undefined') {
      throw new Error('Axios is required.')
    }

    this.axios = axios
    this.requests = []
  }

  async execute() {
    // @TODO - Validate results.
    //   - Ensure expected resource type is returned.
    const results = await this.axios.post('subrequests?_format=json', this.requests)

    for (const subrequest in results.data) {
      let result
      try {
        result = JSON.parse(results.data[subrequest].body)
      } catch (err) {
        throw new Error(`${results.data[subrequest].headers.status[0]}: Invalid data for ${subrequest}, ensure resource is available.`)
      }

      // If error, throw error.
      if (typeof result.errors !== 'undefined') {
        throw new Error(`${result.errors[0].status}: ${result.errors[0].title}: ${result.errors[0].detail}`)
      }

      // Throw error if any items are omitted.
      // @TODO - Add better error handiling.
      // - Display information about required permissions.
      if (result.meta && typeof result.meta.omitted !== 'undefined') {
        // Get a list of error details.
        const details = {}
        for (const key in result.meta.omitted.links) {
          const item = result.meta.omitted.links[key]
          if (typeof item.meta !== 'undefined') {
            details[item.meta.detail] = true
          }
        }

        throw new Error(`${result.meta.omitted.detail}\n\n${Object.keys(details)}`)
      }

      results.data[subrequest] = await deserialze(result)
    }

    return results.data
  }
}

export default Subrequest

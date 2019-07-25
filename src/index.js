'use strict'

import axios from 'axios'
import { Deserializer } from 'jsonapi-serializer'

import auth from './auth'
import getFormSchema from './getFormSchema'
import requiredResources from './requiredResources'

// @TODO - Tests
// - Test that I can't remove required resources.
// - Test that I can override required resources.

/**
 * Default options.
 *
 * @returns {{auth: {}, resources}}
 */
const defaultOptions = () => {
  const resources = {}

  // Get required resource defaults.
  for (const resource in requiredResources) {
    resources[resource] = requiredResources[resource].defaultValue
  }

  return {
    auth: null,
    resources
  }
}

/**
 * Drupal JSON:API Entities class.
 */
class drupalJSONAPIEntities {
  /**
   * Constructor.
   *
   * @param url
   * @param options
   */
  constructor(baseURL, options = {}) {
    // Check for URL.
    if (!baseURL) throw new Error('The \'baseURL\' parameter is required.')

    this.headers = {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }

    // Setup Axios.
    this._axios = axios.create({ baseURL })
    this._axios.interceptors.request.use(async request => {
      // Authorize the request.
      // @TODO - Add support for other auth methods?
      if (typeof options.auth !== 'undefined' && request.url.startsWith('subrequests')) {
        const oauth = await auth.OAuth2(baseURL, options.auth)

        // Add Authorization header to subrequests.
        for (const index in request.data) {
          request.data[index].headers['Authorization'] = `${oauth.token_type} ${oauth.access_token}`
        }
      }

      return request
    })

    // Setup JSON API Deserializer.
    this.deserializer = new Deserializer({
      keyForAttribute: 'underscore_case'
    })

    // Setup options, using default if not provided.
    this.options = Object.assign(defaultOptions(), options)
    this.options.resources = Object.assign(defaultOptions().resources, this.options.resources)
  }

  async getFormSchema(entityType, bundle, mode = 'default') {
    return getFormSchema(entityType, bundle, mode, { root: this })
  }

  async getSubrequests(subrequests) {
    // @TODO - Validate results.
    const results = await this._axios.post('subrequests?_format=json', subrequests)

    for (const subrequest in results.data) {
      const result = JSON.parse(results.data[subrequest].body)

      // If error, throw error.
      if (typeof result.errors !== 'undefined') {
        throw new Error(`${result.errors[0].status} ${result.errors[0].title}: ${result.errors[0].detail}`)
      }

      // Throw error if any items are omitted.
      // @TODO - Add better error handiling.
      // - Display information about required permissions.
      if (typeof result.meta.omitted !== 'undefined') {
        throw new Error(result.meta.omitted.detail)
      }

      results.data[subrequest] = await this.deserializer.deserialize(result)
    }

    return results.data
  }

}

export default drupalJSONAPIEntities

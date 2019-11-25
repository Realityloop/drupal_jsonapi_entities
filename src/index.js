'use strict'

import axios from 'axios'

import auth from './auth'
import formSchema from './formSchema'
import viewSchema from './viewSchema'
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
    this.axios = axios.create({ baseURL })
    this.axios.interceptors.request.use(async request => {
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

    // Setup options, using default if not provided.
    this.options = Object.assign(defaultOptions(), options)
    // @TODO: options.resources isn't in use yet, or documented. It should be
    //        available to override the resource name/path for any Drupal
    //        JSON: API resources.
    this.options.resources = Object.assign(defaultOptions().resources, this.options.resources)
  }

  async getFormSchema(entityType, bundle, mode = 'default') {
    const schema = new formSchema({ entityType, bundle, mode, axios: this.axios })
    await schema.build()
    return schema
  }

  async getViewSchema(entityType, bundle, mode = 'default') {
    const schema = new viewSchema({ entityType, bundle, mode, axios: this.axios })
    await schema.build()
    return schema
  }

}

export default drupalJSONAPIEntities

'use strict'

import axios from 'axios'

// @TODO - Tests
// - Test that I can't remove required resources.
// - Test that I can override required resources.

// Required resources.
const requiredResource = {
  baseFieldOverride: {
    title: 'Base field override',
    defaultValue: 'base_field_override--base_field_override',
    permission: '@TODO'
  },

  entityFormDisplay: {
    title: 'Entity form display',
    defaultValue: 'entity_form_display--entity_form_display',
    permission: '@TODO'
  },

  entityFormMode: {
    title: 'Entity form mode',
    defaultValue: 'entity_form_mode--entity_form_mode',
    permission: '@TODO'
  },

  entityViewDisplay: {
    title: 'Entity view display',
    defaultValue: 'entity_view_display--entity_view_display',
    permission: '@TODO'
  },

  entityViewMode: {
    title: 'Entity view mode',
    defaultValue: 'entity_view_mode--entity_view_mode',
    permission: '@TODO'
  },

  fieldConfig: {
    title: 'Field config',
    defaultValue: 'field_config--field_config',
    permission: '@TODO'
  },

  fieldStorageConfig: {
    title: 'Field storage config',
    defaultValue: 'field_storage_config--field_storage_config',
    permission: '@TODO'
  }
}

class drupalJSONAPIEntities {
  constructor(url, options = {}) {
    // Check for URL.
    if (!url) throw new Error('URL is required.')

    // Set URL in Axios.
    axios.defaults.baseURL = url

    // Setup options, using default if not provided.
    this.options = Object.assign(this.defaultOptions(), options)
    this.options.resources = Object.assign(this.defaultOptions().resources, this.options.resources)
  }

  /**
   * Initialize.
   * - Connect to Drupal JSON:API.
   * - Build list of entity resources.
   *
   * @returns {Promise<drupalJSONAPIEntities>}
   */
  async init() {
    // Get the root JSON:API endpoint.
    const result = await axios.get().catch(err => {
      throw new Error(`GET ${axios.defaults.baseURL}: ${err.response.status}: ${err.response.statusText}`)
    })

    // @TODO - Authentication.
    // - Support multiple OAuth 2 methods.
    // - Auth optional.

    // @TODO - Validation.
    // - Do we have the correct auth details.

    // Ensure the required resources are available.
    for (const key in requiredResource) {
      const resource = requiredResource[key]
      const link = this.options.resources[key]

      // Error if resource is missing.
      // @TODO - don't error until all missing resources discovered.
      if (typeof result.data.links[link] === 'undefined') throw new Error(`Required resource missing: ${resource.title}`)
    }

    // @TODO - Structure data
    // - Make it useful, and the basis for the schema
    // - Make each resource it's own class?
    //     drupalJSONAPIEntities().init().entity('node')->type('article')->form()
    //     drupalJSONAPIEntities().init().getForm('node', 'article')
    //     drupalJSONAPIEntities().init().entity('node')->type('article')->view()
    this.links = result.data.links

    return this
  }

  getForm(entity, bundle, mode = 'default') {
    console.log(mode)
  }

  defaultOptions() {
    const resources = {}

    // Get required resource defaults.
    for (const resource in requiredResource) {
      resources[resource] = requiredResource[resource].default
    }

    return {
      resources
    }
  }
}

(async () => {
  // eslint-disable-next-line
  const dje = await new drupalJSONAPIEntities('http://api.dje.localhost/api').init()
  // dje.getForm()
  // console.log(dje)
})().catch(err => {
  console.log(err)
})
// test.getForm('node')

// export default drupalJSONAPIEntities
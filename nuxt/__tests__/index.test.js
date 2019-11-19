jest.setTimeout(60000)

import mockEntityFormDisplay from '../../src/resources/__fixtures__/entity_form_display'
import mockFieldConfig from '../../src/resources/__fixtures__/field_config'
import mockFieldStorageConfig from '../../src/resources/__fixtures__/field_storage_config'

import axios from 'axios'
import { Nuxt, Builder } from 'nuxt-edge'
import config from '../__fixtures__/nuxt.config'
import Vue from 'vue'

import module from '..'

jest.mock('axios')
axios.create.mockReturnValue({
  interceptors: { request: { use: () => { } } },
  post: () => ({
    data: {
      'node--recipe--default--entity_form_display': { body: JSON.stringify(mockEntityFormDisplay) },
      'node--recipe--field_config': { body: JSON.stringify(mockFieldConfig) },
      'node--field_storage_config': { body: JSON.stringify(mockFieldStorageConfig) }
    }
  })
})

describe('Nuxt', () => {
  test('Module', async () => {
    try {
      await module()
    }
    catch (e) {
      expect(e.message).toBe('Drupal JSON:API Entities requires the modules \'baseUrl\' to be set.')
    }

    try {
      await module({ baseUrl: 'https://example.com'})
    }
    catch (e) {
      expect(e.message).toBe('The Drupal JSON:API Entities module requires a \'drupalJSONAPIEntities\' entry in nuxt.config.js.')
    }
  })

  test('Plugin - Schema', async () => {
    const nuxt = new Nuxt(config)
    await nuxt.ready()

    const builder = new Builder(nuxt)
    await builder.build()

    expect(builder.plugins.length).toBe(1)
    expect(builder.plugins[0].src).toBe('./drupalJSONAPIEntities.js')

    // Install the plugin.
    require('../__fixtures__/.nuxt/' + builder.plugins[0].src)
    const app = new Vue()

    const schema = app.$drupalJSONAPIEntities()
    expect(schema).toMatchSnapshot()
  })
})

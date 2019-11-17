jest.setTimeout(60000)

import mockEntityFormDisplay from '../../src/resources/__fixtures__/entity_form_display'
import mockFieldConfig from '../../src/resources/__fixtures__/field_config'
import mockFieldStorageConfig from '../../src/resources/__fixtures__/field_storage_config'

import axios from 'axios'
import { Nuxt, Builder } from 'nuxt-edge'
import config from '../__fixtures__/nuxt.config'
import Vue from 'vue'

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

describe('Nuxt module', () => {
  let nuxt
  let builder

  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await nuxt.ready()
  })

  test('Plugin', async () => {
    builder = new Builder(nuxt)
    await builder.build()

    expect(builder.plugins.length).toBe(1)
    expect(builder.plugins[0].src).toBe('./drupalJSONAPIEntities.js')

    // Install the plugin.
    const plugin = require('../__fixtures__/.nuxt/' + builder.plugins[0].src).default
    Vue.use(plugin)

    const app = new Vue()
    const schema = app.$drupalJSONAPIEntities()
    expect(schema.node.recipe.default.fields).toMatchSnapshot()
  })
})

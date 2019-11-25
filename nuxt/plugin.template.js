import Vue from 'vue'

// Parse raw schema JSON.
// @TODO - Dynamically load from cached JSON files?
const schemas = <%= JSON.stringify(options.schemas) %>

Vue.use({
  install: function (Vue) {
    Vue.prototype.$drupalJSONAPIEntities = () => {
      return schemas
    }
  }
})

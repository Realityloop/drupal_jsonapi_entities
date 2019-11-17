// Parse raw schema JSON.
// @TODO - Dynamically load from cached JSON files?
const schemas = <%= JSON.stringify(options.schemas) %>

export default {
  install (Vue, options) {
    // eslint-disable-next-line
    console.log('install')
    Vue.prototype.$drupalJSONAPIEntities = () => {
      return schemas
    }
  }
}

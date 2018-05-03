const dotProp = require('dot-prop')

function MongooseDetail(schema, configuration) {
  const config = configuration || {}
  const skip = config.skip || []
  const name = config.name || 'detail'

  const detail = {}

  function buildDefinition(schema) {
    for (const key in schema.paths) {
      if (schema.paths[key].schema) {
        return buildDefinition(schema.paths[key].schema)
      }
      const { path, options } = schema.paths[key]
      if (skip.includes(path)) {
        continue
      }

      let opts
      let definition
      if (Array.isArray(options.type)) {
        // Note: Support empty array definitions
        opts = options.type.length === 0 ? options.type : options.type[0]
        definition = opts.type ? Object.assign({}, opts, { type: opts.type.name }) : opts
      } else {
        definition = Object.assign({}, options, { type: options.type.name })
      }

      dotProp.set(detail, path, definition)
    }
  }

  buildDefinition(schema)
  schema.statics[name] = () => detail
}

module.exports = MongooseDetail

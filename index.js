const dotProp = require('dot-prop')

function buildDefinition(options) {
  if (Array.isArray(options)) {
    return options.map((attr) => buildDefinition(attr))
  }
  if (Array.isArray(options.type)) {
    const attributes = options.type
    return attributes.map((attr) => buildDefinition(attr))
  }
  if (options.type) {
    return Object.assign({}, options, { type: options.type.name })
  }
  return Object.keys(options).reduce((result, key) => {
    result[key] = buildDefinition(options[key])
    return result
  }, {})
}

function MongooseDetail(schema, configuration) {
  const config = configuration || {}
  const skip = config.skip || []
  const staticName = config.name || 'detail'

  const detail = () => {
    const paths = Object.keys(schema.paths)
    return paths.reduce((result, key) => {
      if (skip.includes(key)) {
        return result
      }

      const { options } = schema.paths[key]
      const definition = buildDefinition(options)

      if (key.includes('.')) {
        dotProp.set(result, key, definition)
      } else {
        result[key] = definition
      }
      return result
    }, {})
  }

  schema.statics[staticName] = () => detail()
}

module.exports = MongooseDetail

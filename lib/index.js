const dotProp = require('dot-prop')

function functionName(func) {
  return func.name || func
}

function buildDefinition(definition, typeMap) {
  if (!definition) {
    return definition
  }
  if (Array.isArray(definition)) {
    return [buildDefinition(definition[0], typeMap)]
  }
  if (typeof definition === 'function') {
    return { type: typeMap(definition) }
  }
  if (Array.isArray(definition.type)) {
    return [buildDefinition(definition.type[0], typeMap)]
  }
  if (definition.type && typeof definition.type === 'function') {
    return Object.assign({}, definition, { type: typeMap(definition.type) })
  }
  return Object.keys(definition).reduce((result, key) => {
    result[key] = buildDefinition(definition[key], typeMap)
    return result
  }, {})
}

function MongooseDetail(schema, configuration) {
  const config = configuration || {}
  const skip = config.skip || []
  const staticName = config.name || 'detail'
  const typeMap = config.typeMap || functionName

  const detail = () => {
    const paths = Object.keys(schema.paths)
    return paths.reduce((result, key) => {
      if (skip.includes(key)) {
        return result
      }

      const { options } = schema.paths[key]
      const definition = buildDefinition(options, typeMap)

      dotProp.set(result, key, definition)
      return result
    }, {})
  }

  schema.statics[staticName] = () => detail()
}

module.exports = MongooseDetail

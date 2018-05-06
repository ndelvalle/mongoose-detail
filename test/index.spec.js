/* global describe, it, expect */

const mongooseDetail = require('../lib')
const mongoose = require('mongoose')
const fixture = require('./fixture')

describe('mongoose-detail -> plugin', () => {
  it('is a function', () => {
    expect(typeof mongooseDetail).toBe('function')
  })

  describe('plugin', () => {
    it('expose the schema definition using the detail static function', () => {
      const fooSchema = mongoose.Schema(fixture)
      fooSchema.plugin(mongooseDetail)
      const Foo = mongoose.model('Foo', fooSchema)
      const detail = Foo.detail()

      expect(detail).toMatchSnapshot()
    })
  })

  describe('plugin options', () => {
    describe('skip', () => {
      it('skips attributes defined in the options', () => {
        const bazSchema = mongoose.Schema(fixture)
        bazSchema.plugin(mongooseDetail, {
          skip: ['_id', 'name', 'metaData'],
        })
        const Baz = mongoose.model('Baz', bazSchema)
        const detail = Baz.detail()

        expect(detail).toMatchSnapshot()
      })
    })
  })

  describe('name', () => {
    it('sets the specified name as a static method name of the shema', () => {
      const sarasaSchema = mongoose.Schema(fixture)
      sarasaSchema.plugin(mongooseDetail, {
        name: 'expose',
      })
      const Sarasa = mongoose.model('Sarasa', sarasaSchema)

      expect(typeof Sarasa.expose).toBe('function')
      expect(typeof Sarasa.detail).toBe('undefined')
    })
  })

  describe('typeMap', () => {
    it('uses the specified type map function instead of the default', () => {
      const tigrinSchema = mongoose.Schema(fixture)
      tigrinSchema.plugin(mongooseDetail, {
        typeMap: (type) => (type.name && `${type.name} - Foo`) || type,
      })
      const Tigrin = mongoose.model('Tigrin', tigrinSchema)
      const detail = Tigrin.detail()

      expect(detail).toMatchSnapshot()
    })
  })
})

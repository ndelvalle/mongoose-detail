const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const fixture = {
  name: { type: String, required: true, unique: true },
  age: { type: Number, min: 18, max: 65 },
  email: { type: String, lowercase: true, trim: true },
  teams: [
    {
      isBocaJuniors: { type: Boolean, default: true },
      ref: { type: Object, ref: 'Team' },
    },
  ],
  pets: [{ type: ObjectId, ref: 'Pet' }],
  metaData: {
    type: {
      isFoo: Boolean,
    },
    address: { type: String },
    binary: Buffer,
    nested: {
      stuff: { type: String, lowercase: true, trim: true },
    },
    connectInfo: {
      isFromArgentina: Boolean,
      phones: [Number],
      emails: [String],
      address: {
        city: String,
        street: String,
      },
    },
  },
  arrayOfString: [String],
  arrayOfNumber: [{ type: Number }],
  arrayOfDates: [Date],
  arrayOfBuffer: [Buffer],
  arrayOfBoolean: [Boolean],
  arrayOfMixed: [Schema.Types.Mixed],
  arrayOfObjectId: [Schema.Types.ObjectId],
  arrayOfArrays: [[]],
  arrayOfArrayOfNumbers: [[Number]],
  createdAt: { type: Date, default: Date.now },
}

module.exports = fixture

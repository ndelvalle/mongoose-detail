# mongoose-detail

[ ![Codeship Status for ndelvalle/mongoose-detail](https://app.codeship.com/projects/d68c0940-3327-0136-6fb9-0e05c0ab05bf/status?branch=master)](https://app.codeship.com/projects/288940)
[![Coverage Status](https://coveralls.io/repos/github/ndelvalle/mongoose-detail/badge.svg?branch=master)](https://coveralls.io/github/ndelvalle/mongoose-detail?branch=master)
[![dependencies Status](https://david-dm.org/ndelvalle/mongoose-detail/status.svg)](https://david-dm.org/ndelvalle/mongoose-detail)
[![devDependencies Status](https://david-dm.org/ndelvalle/mongoose-detail/dev-status.svg)](https://david-dm.org/ndelvalle/mongoose-detail?type=dev)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/295b87fd948a45cca4ae3e0a9c22235c)](https://www.codacy.com/app/ndelvalle/mongoose-detail?utm_source=github.com&utm_medium=referral&utm_content=ndelvalle/mongoose-detail&utm_campaign=Badge_Grade)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-green)](https://github.com/prettier/prettier)

Mongoose plugin to expose schema definitions programmatically

## Install

```bash
$ npm install --save mongoose-detail
```

```bash
$ yarn add mongoose-detail
```

## Use

```javascript
const mongooseDetail = require('mongoose-detail')
const mongoose = require('mongoose')

const kittySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number },
})

kittySchema.plugin(mongooseDetail, {
  skip: ['_id', '__v'], // Optional Properties to skip. The default value is []
  name: 'detail', // Optional static function name. The default value is 'detail'
})

const Kitten = mongoose.model('Kitten', kittySchema)

Kitten.detail()
//  {
//    name: { type: 'String', required: true, unique: true },
//    age: { type: 'Number' },
//  }
```

import Backbone from 'backbone'

import Band from '../models/Band'

const Bands = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/kid_HyAproyt/bands`,
  model: Band
})

export default Bands

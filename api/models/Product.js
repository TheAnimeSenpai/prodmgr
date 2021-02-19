/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const {
  config: {
    enums: { ProductStatus },
  },
} = sails;

module.exports = {
  tableName: 'products',

  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    latitude: {
      type: 'string',
      required: true,
    },
    longitude: {
      type: 'string',
      isEmail: true,
    },
    radius: {
      type: 'string',
    },
    imageUrl: {
      type: 'string',
      allowNull: true,
    },
    status: {
      type: 'number',
      isIn: _.values(ProductStatus),
      defaultsTo: Status.AVAILABLE,
    },
    merchant: {
      model: 'Merchant',
      required: true,
    },
  },

  customToJSON: function () {
    return _.omit(this, ['password']);
  },
};

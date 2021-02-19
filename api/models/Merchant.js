/**
 * Merchant.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const {
  config: {
    enums: { Status },
  },
} = sails;

module.exports = {
  tableName: 'merchants',

  attributes: {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    msisdn: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      isEmail: true,
    },
    password: {
      type: 'string',
    },
    avatar: {
      type: 'string',
      allowNull: true,
    },
    status: {
      type: 'number',
      isIn: _.values(Status),
      defaultsTo: Status.ACTIVE,
    },
    businessName: {
      type: 'string',
    },
    address: {
      type: 'string',
      allowNull: true,
    },
    products: {
      collection: 'Product',
      via: 'merchant',
    },
  },

  customToJSON: function () {
    return _.omit(this, ['password']);
  },
};

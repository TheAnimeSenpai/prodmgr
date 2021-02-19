/**
 * Customer.js
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
    tableName: 'customers',
  
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
        defaultsTo: Status.INACTIVE,
      },
      businessName: {
        type: 'string',
      },
      address: {
        type: 'string',
        allowNull: true,
      },
      latitude: {
        type: 'string',
      }, 
      longitude: {
        type: 'string',
      },
    },
  
    customToJSON: function () {
      return _.omit(this, ['password']);
    },
  };
  
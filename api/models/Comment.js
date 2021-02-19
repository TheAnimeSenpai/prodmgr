/**
 * Comment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'comments',

  attributes: {
    content: {
      type: 'string',
      required: true,
    },
    product: {
      model: 'Product',
      required: true,
    },
    parent: {
      model: 'Comment',
    },
    subComments: {
      collection: 'Comment',
      via: 'parent',
    },
  },
};

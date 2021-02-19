const {
  config: {
    enums: {
      Inputs: { REQUIRED },
    },
    exits: { helper },
    iProduct: {
      radius,
    },
  },
} = sails;

module.exports = {
  friendlyName: 'Get All Products',

  description: 'Get all products.',

  inputs: {
    radius: radius(REQUIRED),
  },

  exits: helper,

  fn: async function ({ radius }, exits) {
    const { id } = await Product.create({
      ...inputs,
    })
      .fetch()
      .intercept((err) => {
        sails.log.error('Error attempting to add a new product.', err);
        return err;
      });

    return exits.success(products);
  },
};

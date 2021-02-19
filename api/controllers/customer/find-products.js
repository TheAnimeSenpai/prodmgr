const {
  config: {
    exits: { api },
    errorMapper: { parseError },
  },
} = sails;

module.exports = {
  friendlyName: 'Find Products',

  description: 'Find the products near you.',

  inputs: {},

  exits: {
    ...api,
    success: {
      description: 'The list of products near you.',
    },
  },

  fn: async function (inputs, exits) {
    const customer = await Customer.findOne({
      id: this.req.options.authToken,
    }).intercept((err) => {
      sails.log.error('unable to find the logged in customer.', err);
      return parseError(err);
    });

    const response = await sails.helpers.product.getAll
      .with({ address: customer.address })
      .intercept((err) => {
        sails.log.error('unable to find products near you.', err);
        return parseError(err);
      });

    return exits.success(response);
  },
};

const {
  config: {
    enums: {
      Inputs: { OPTIONAL, REQUIRED },
    },
    exits: { helper },
    iProduct: {
      description,
      imageUrl,
      latitude,
      longitude,
      merchant,
      name,
      radius,
    },
  },
} = sails;

module.exports = {
  friendlyName: 'Create Product',

  description: 'Create new product.',

  inputs: {
    description: description(REQUIRED),
    imageUrl: imageUrl(REQUIRED),
    latitude: latitude(REQUIRED),
    longitude: longitude(REQUIRED),
    merchant: merchant(REQUIRED),
    name: name(REQUIRED),
    radius: radius(OPTIONAL),
  },

  exits: {
    ...helper,
    success: {
      description: 'New product was created successfully.',
    },
  },

  fn: async function (inputs, exits) {
    inputs.radius = inputs.radius === null ? 0 : inputs.radius;

    const { id } = await Product.create({
      ...inputs,
    })
      .fetch()
      .intercept((err) => {
        sails.log.error('Error attempting to add a new product.', err);
        return err;
      });

    return exits.success({ productId: id });
  },
};

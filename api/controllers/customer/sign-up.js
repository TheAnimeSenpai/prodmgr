const {
  config: {
    enums: {
      Inputs: { OPTIONAL, REQUIRED },
    },
    exits: { api },
    iCustomer: {
      address,
      avatar,
      email,
      firstName,
      lastName,
      msisdn,
      password,
    },
  },
} = sails;

module.exports = {
  friendlyName: 'Create Customer',

  description: 'Create new customer.',

  inputs: {
    address: address(REQUIRED),
    avatar: avatar(OPTIONAL),
    email: email(REQUIRED),
    firstName: firstName(REQUIRED),
    lastName: lastName(REQUIRED),
    msisdn: msisdn(REQUIRED),
    password: password(REQUIRED),
  },

  exits: {
    ...api,
    success: {
      description: 'New customer was created successfully.',
    },
  },

  fn: async function (inputs, exits) {
    const response = await sails.helpers.controllers.customer.create
      .with(inputs)
      .intercept((err) => {
        sails.log.error('Error attempting to create a new customer', err);
        return err;
      });

    return exits.success(response);
  },
};

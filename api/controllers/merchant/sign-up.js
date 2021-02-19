const {
  config: {
    enums: {
      Inputs: { OPTIONAL, REQUIRED },
    },
    exits: { api },
    iMerchant: {
      address,
      avatar,
      businessName,
      email,
      firstName,
      lastName,
      msisdn,
      password,
    },
  },
} = sails;

module.exports = {
  friendlyName: 'Create Merchant',

  description: 'Create new merchant.',

  inputs: {
    address: address(REQUIRED),
    avatar: avatar(OPTIONAL),
    businessName: businessName(REQUIRED),
    email: email(REQUIRED),
    firstName: firstName(REQUIRED),
    lastName: lastName(REQUIRED),
    msisdn: msisdn(REQUIRED),
    password: password(REQUIRED),
  },

  exits: {
    ...api,
    success: {
      description: 'New merchant was created successfully.',
    },
  },

  fn: async function (inputs, exits) {
    const response = await sails.helpers.controllers.merchant.create
      .with(inputs)
      .intercept((err) => {
        sails.log.error(
          'Error attempting to create a new merchant',
          err
        );
        return err;
      });

    return exits.success(response);
  },
};

const {
  config: {
    enums: {
      Inputs: { OPTIONAL, REQUIRED },
    },
    exits: { helper },
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
    ...helper,
    success: {
      description: 'New merchant was created successfully.',
    },
  },

  fn: async function (inputs, exits) {
    const {
      helpers: {
        controllers: {
          auth: { hash },
        },
      },
    } = sails;

    const merchant = await Merchant.findOne({
      msisdn: inputs.msisdn,
    }).intercept((err) => {
      sails.log.error(
        'Error attempting to check if merchant already exists.',
        err
      );
      return err;
    });

    if (merchant) {
      return exits.badRequest({
        id: merchant.id,
        message: 'merchant already exists',
      });
    }

    const hashPassword = await hash(password).intercept((err) => {
      sails.log.error('Error attempting to hash new password.', err);
      return err;
    });

    const { id } = await Merchant.create({
      ..._.omit(inputs, ['password']),
      password: hashPassword,
    })
      .fetch()
      .intercept((err) => {
        sails.log.error('Error attempting to add a new merchant.', err);
        return err;
      });

    return exits.success({ merchantId: id });
  },
};

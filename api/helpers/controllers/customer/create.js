const {
  config: {
    enums: {
      Inputs: { OPTIONAL, REQUIRED },
    },
    exits: { helper },
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
    ...helper,
    success: {
      description: 'New customer was created successfully.',
    },
  },

  fn: async function (inputs, exits) {
    const {
      helpers: {
        controllers: {
          auth: { hash },
        },
        services: {
          google: { getLocation },
        },
      },
    } = sails;

    const customer = await Customer.findOne({
      msisdn: inputs.msisdn,
    }).intercept((err) => {
      sails.log.error(
        'Error attempting to check if customer already exists.',
        err
      );
      return err;
    });

    if (customer) {
      return exits.badRequest({
        id: customer.id,
        message: 'customer already exists',
      });
    }

    const hashPassword = await hash(password).intercept((err) => {
      sails.log.error('Error attempting to hash new password.', err);
      return err;
    });

    const { longitude, latitude } = await getLocation().intercept((err) => {
      sails.log.error('Error attempting to get location for user.', err);
      return err;
    });

    const { id } = await Customer.create({
      ..._.omit(inputs, ['password']),
      password: hashPassword,
      latitude,
      longitude,
    })
      .fetch()
      .intercept((err) => {
        sails.log.error('Error attempting to add a new customer.', err);
        return err;
      });

    return exits.success({ customerId: id });
  },
};

const {
  config: {
    custom: { argon2 },
    enums: {
      Inputs: { REQUIRED },
    },
    exits: { helper },
    iAuth: { hashInput },
  },
} = sails;

module.exports = {
  friendlyName: 'Generate Hash String',

  description: 'Generate hash from string.',

  inputs: {
    hashInput: hashInput(REQUIRED),
  },

  exits: helper,

  fn: async function ({ hashInput }, exits) {
    try {
      const hash = await argon2.hash(hashInput);

      return exits.success(hash);
    } catch (err) {
      sails.log.error('unable to hash provided string', err);
      return exits.serverError();
    }
  },
};

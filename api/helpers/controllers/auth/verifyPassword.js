const {
  config: {
    custom: { argon2 },
    enums: {
      Inputs: { REQUIRED },
    },
    exits: { helper },
    iAuth: { hashPassword, password },
  },
} = sails;

module.exports = {
  friendlyName: 'Verify Password Hash',

  description: 'Verify the supplied password with saved hash.',

  inputs: {
    password: password(REQUIRED),
    hashPassword: hashPassword(REQUIRED),
  },

  exits: helper,

  fn: async function ({ password, hashPassword }, exits) {
    try {
      const valid = await argon2.verify(hashPassword, password);

      return valid ? exits.success() : exits.badRequest();
    } catch (err) {
      sails.log.error('failed to verify hashed password');
      return exits.serverError();
    }
  },
};

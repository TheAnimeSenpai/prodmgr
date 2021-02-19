const {
  config: {
    custom: { jwt, secret, tokenValidityPeriod },
    enums: {
      Inputs: { REQUIRED },
    },
    exits: { helper },
    iAuth: { parameters },
  },
} = sails;

const generateExpiration = () => {
  return Math.floor(Date.now() / 1000) + tokenValidityPeriod;
};

module.exports = {
  friendlyName: 'Generate Authentication Token',

  description: 'Generate authentication token for subsequent api calls.',

  inputs: {
    parameters: parameters(REQUIRED),
  },

  exits: helper,

  fn: async function ({ parameters }, exits) {
    const authToken = jwt.sign(
      {
        exp: generateExpiration(),
        ...parameters,
      },
      secret
    );

    return exits.success(authToken);
  },
};

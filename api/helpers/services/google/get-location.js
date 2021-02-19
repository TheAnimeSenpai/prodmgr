const {
  config: {
    enums: {
      Inputs: { REQUIRED },
    },
    exits: { helper },
    iGoogle: { address },
  },
} = sails;

module.exports = {
  friendlyName: 'Get Location',

  description: 'Get location using specified address.',

  inputs: {
    address: address(REQUIRED),
  },

  exits: helper,

  fn: async function ({ address }, exits) {
    //TO-DO
    //code to call google service api to get location using address...
    const latitude = 100;
    const longitude = 100;

    return exits.success({ latitude, longitude });
  },
};

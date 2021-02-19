const {
  config: {
    enums: {
      Inputs: { OPTIONAL, REQUIRED },
    },
    exits: { helper },
    iSms: { content, msisdn, provider },
  },
} = sails;

module.exports = {
  friendlyName: 'Send SMS',

  description: 'Send SMS to specified msisdn.',

  inputs: {
    content: content(REQUIRED),
    provider: provider(OPTIONAL),
    msisdn: msisdn(REQUIRED),
  },

  exits: helper,

  fn: async function ({ content, provider, msisdn }, exits) {
    //TO-DO
    //code to call comms service api to send sms...

    return exits.success();
  },
};

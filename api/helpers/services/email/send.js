const {
  config: {
    custom: { axios, emailUrl, statusCodes },
    enums: {
      Inputs: { OPTIONAL, REQUIRED },
    },
    exits: { helper },
    iEmail: { to, cc, bcc, subject, attachment, template, parameters },
    systemSettings: { EmailSender },
  },
} = sails;

module.exports = {
  friendlyName: 'Send Email Helper',

  description: 'Helper class to send emails',

  inputs: {
    to: to(REQUIRED),
    cc: cc(OPTIONAL),
    bcc: bcc(OPTIONAL),
    subject: subject(REQUIRED),
    attachment: attachment(OPTIONAL),
    template: template(REQUIRED),
    parameters: parameters(OPTIONAL),
  },

  exits: helper,

  fn: async function (inputs, exits) {
    //TO-DO
    //code to call comms service api to send email...

    return exits.success();
  },
};

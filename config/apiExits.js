/**
 * Custom configuration for error codes
 * (sails.config.exits)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */
const { reduce } = require('lodash');
const { StatusCodes } = require('http-status-codes');

const exits = {
  resourceCreated: {
    statusCode: StatusCodes.CREATED,
    description: 'Created Successfully',
    responseType: 'success',
  },
  serverError: {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    description: 'A server error occurred',
    responseType: 'serverError',
  },
  databaseError: {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    description: 'An error tied to a database operation',
    responseType: 'databaseError',
  },
  badRequest: {
    statusCode: StatusCodes.BAD_REQUEST,
    description: 'An error occurred due to invalid values supplied.',
    responseType: 'badRequest',
  },
  forbidden: {
    statusCode: StatusCodes.FORBIDDEN,
    description: 'No Access Allowed.',
    responseType: 'forbidden',
  },
  notFound: {
    statusCode: StatusCodes.NOT_FOUND,
    description: 'Element being searched for, or requested for, does not exist',
    responseType: 'notFound',
  },
  invalidCredentials: {
    statusCode: StatusCodes.BAD_REQUEST,
    description: 'Invalid username and/or password supplied.',
  },
  conflict: {
    statusCode: StatusCodes.CONFLICT,
    description: 'The state of the user is not consistent with the data stored',
  },
};

const helperExits = reduce(
  exits,
  (acc, value, key) => {
    let { responseType, statusCode, ...newObj } = value;
    acc[key] = newObj;
    return acc;
  },
  {}
);

module.exports.exits = {
  api: { ...exits },
  helper: helperExits,
};

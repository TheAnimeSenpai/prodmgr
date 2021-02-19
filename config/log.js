/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * https://sailsjs.com/docs/concepts/logging
 */

let winston = require('winston');

let transports = [
  new winston.transports.File({
    filename: 'error.log',
    level: 'error',
    format: winston.format.json(),
  }),
  new winston.transports.File({
    filename: 'combined.log',
    format: winston.format.json(),
  }),
];

let customLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports,
  exitOnError: false,
});

module.exports.log = {
  /***************************************************************************
   *                                                                          *
   * Valid `level` configs: i.e. the minimum log level to capture with        *
   * sails.log.*()                                                            *
   *                                                                          *
   * The order of precedence for log levels from lowest to highest is:        *
   * silly, verbose, info, debug, warn, error                                 *
   *                                                                          *
   * You may also set the level to "silent" to suppress all logs.             *
   *                                                                          *
   ***************************************************************************/

  level: process.env.LOG_LEVEL,
  custom: customLogger,
};

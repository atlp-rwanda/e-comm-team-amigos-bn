import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      level: 'warn',
      filename: 'logsWarning.log'
    }),
    new transports.File({
      level: 'error',
      filename: 'logsErrors.log'
    })
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.metadata(),
    format.prettyPrint(),
    format.errors({ stack: true })
  ),

  defaultMeta: { service: 'user-service' }
});

export default logger;

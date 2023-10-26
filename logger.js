import winston, {transports, format} from "winston";
import {DateTime} from 'luxon'

const loggerLevel = [ 'info', 'debug', 'error', 'warn' ]

const logFormat = format.printf(({ level, message,  }) => {
    const timestamp = DateTime.now().toUTC()
    return `${timestamp} [${level}] ${level}: ${message}`;
  });

export const getLoggerInstance = () => {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
          new transports.Console({format: format.combine (format.colorize(), logFormat) }),          
        ],
      });

      return logger; 
}
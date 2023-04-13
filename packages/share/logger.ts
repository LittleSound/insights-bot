import { createLogger, format, transports } from 'winston'
import { blue, cyan, red, yellow } from 'colors/safe'

function mapLevelColor(level: string): string {
  switch (level) {
    case '[info]':
      return blue(level)
    case '[warn]':
      return yellow(level)
    case '[error]':
      return red(level)
    default:
      return cyan(level)
  }
}

const customFormat = format.printf(({ level, message, module, timestamp }) => {
  return `${timestamp} ${mapLevelColor(`[${level}]`)}${module ? ` [${module}]` : ''}: ${message}`
})

const _log = createLogger({
  level: 'debug',
  defaultMeta: { service: 'insights-bot' },
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        customFormat,
      ),
    }),
  ],
})

export function newLoggerForModule(moduleName: string) {
  return _log.child({ module: moduleName })
}

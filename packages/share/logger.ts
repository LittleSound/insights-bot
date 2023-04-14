import { createLogger, format, transports } from 'winston'
import { blue, cyan, red, yellow } from 'colors/safe'

function mapLevelColor(level: string): string {
  const levelColors: Record<string, (str: string) => string> = {
    '[info]': blue,
    '[warn]': yellow,
    '[error]': red,
  }

  const color = levelColors[level]
  if (color) return color(level)
  else return cyan(level)
}

const customFormat = format.printf(({ level, message, module, fields, timestamp }) => {
  const fieldsStr: Array<string> = []
  if (fields && fields instanceof Object && Object.keys(fields).length > 0) {
    for (const [key, value] of Object.entries(fields))
      fieldsStr.push(`${key}=${value}`)
  }

  return `${timestamp} ${mapLevelColor(`[${level}]`)}${module ? ` [${module}]` : ''}: ${message} ${fieldsStr.join(' ')}`
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

export enum LogLevel {
  error = 0,
  warn = 1,
  info = 2,
  debug = 3
}

export enum LogMethod {
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug'
}

class Logger {
  /** 命名空间（scope），用于区分所在执行文件 */
  private namespace: string
  private logLevel: number

  constructor(namespace = 'default', level = LogLevel.debug) {
    this.namespace = namespace
    this.logLevel = level
  }

  public create(namespace = 'unknown') {
    return new Logger(namespace)
  }

  private _log(method: LogMethod, args: unknown[]) {
    let level = LogLevel[method]
    if (level <= this.logLevel) {
      console[method](this.namespace, method, ...args)
    }
  }

  /**
   * 打印输出信息 🐛
   *
   * @param args 任意参数
   */
  public info(...args: unknown[]) {
    this._log(LogMethod.info, args)
    return this
  }

  /**
   * 打印输出警告信息 ❕
   *
   * @param args 任意参数
   */
  public warn(...args: unknown[]) {
    this._log(LogMethod.warn, args)
    return this
  }

  /**
   * 打印输出错误信息 ❌
   *
   * @param args 任意参数
   */
  public error(...args: unknown[]) {
    this._log(LogMethod.error, args)
    return this
  }

  /**
   * 设置命名空间（日志前缀）
   * @param namespace
   */
  public setNamespace(namespace = '') {
    this.namespace = `[${namespace}]`
    return this
  }

  public setLogLevel(level: LogLevel) {
    this.logLevel = level
  }
}

export default new Logger()

import { describe, it } from '@jest/globals'
import logger from '..'

describe('logger', () => {
  it('should log', () => {
    logger.info('this is logger')
  })
})

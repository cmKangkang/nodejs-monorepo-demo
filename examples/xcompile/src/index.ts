import { cache, logger } from '@mono/common'

cache.set('a', 111, 1000)
logger.info('hello world')

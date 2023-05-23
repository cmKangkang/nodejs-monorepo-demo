import cache from '@mono/cache'
import logger from '@mono/logger'

cache.set('a', 111, 1000)
logger.info('hello world')

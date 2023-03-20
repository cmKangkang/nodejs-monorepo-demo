type CacheKey = number | string

interface CacheData {
  data: any
}

interface RecordData extends CacheData {
  timer?: ReturnType<typeof setTimeout>
}

class Cache {
  cache: Map<CacheKey, RecordData>

  constructor() {
    this.cache = new Map()
  }

  get(key: string) {
    return this.cache.get(key)
  }

  set(key: CacheKey, data: any, cacheTime: number) {
    if (!key) {
      throw new Error('cache key 必须为字符串！')
    }

    // 添加 data 的同时增加定时器
    // 定时器时间达到则清除
    const _this = this
    const target = _this.cache.get(key)

    if (target?.timer) {
      clearTimeout(target.timer)
    }

    let timer: ReturnType<typeof setTimeout> | undefined = undefined
    if (cacheTime > -1) {
      timer = setTimeout(() => {
        _this.cache.delete(key)
      }, cacheTime)
    }

    _this.cache.set(key, {
      data,
      timer
    })
  }

  has(key: string) {
    return this.cache.has(key)
  }

  clear(key?: CacheKey | CacheKey[]) {
    if (key) {
      const cacheKeys = Array.isArray(key) ? key : [key]
      cacheKeys.forEach(cacheKey => this.cache.delete(cacheKey))
    } else {
      this.cache.clear()
    }
  }
}

export default new Cache()

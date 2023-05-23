import express from 'express'
import formidable from 'express-formidable'
import cookieParser from 'cookie-parser'
import cache from '@mono/cache'
import logger from '@mono/logger'

const app = express()

app.use(formidable())
app.use(cookieParser())
app.use(function (_req, res, next) {
  res.header('Access-Control-Expose-Headers', 'Authorization')
  next()
})
app.use((req, _res, next) => {
  logger.info('receive request', req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  const { login = '$anonymous', password } = req.cookies

  if (login === '$anonymous') {
    return res.redirect('/login')
  }

  if (cache.get(login) === password) {
    res.status(200)
    return res.sendFile('index.html', { root: 'public' })
  }

  res.clearCookie('login')
  res.clearCookie('password')
  return res.sendFile('redirect.html', { root: 'public' })
})

app.get('/login', (req, res) => {
  const { login = '$anonymous', password } = req.cookies

  if (password && cache.get(login) === password) {
    return res.redirect('/')
  }

  return res.sendFile('login.html', { root: 'public' })
})

app.post('/login', (req, res) => {
  const { username, password } = req.fields as Record<string, string>
  if (!username || !password) {
    return res.redirect(301, '/login')
  }
  cache.set(username, password, 10000)
  res.cookie('login', username, {
    maxAge: 10000
  })
  res.cookie('password', password, {
    maxAge: 10000
  })
  res.redirect('/')
})

app.listen(3456, () => {
  logger.info('server listen at port 3456')
})

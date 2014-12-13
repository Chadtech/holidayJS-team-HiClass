fs = require 'fs'
express = require 'express'
app = express()
http = require 'http'
{join} = require 'path'
bodyParser = require 'body-parser'

app.use bodyParser.urlencoded {extended: true}
app.use bodyParser.json()

PORT = Number process.env.PORT or 2950

###
router = express.Router()


router.use (request, response, next) ->
  console.log 'SOMETHIGN HAPPEN'
  next()

router.route '/:project'
  conso

app.use '/api', router
###

app.use express.static join __dirname, 'public'

app.get '/*', (request, response, next) ->
  htmlFileThroughWhichAllContentIsFunnelled = join __dirname, 'public/index.html'
  response.status 200
    .sendFile htmlFileThroughWhichAllContentIsFunnelled

httpServer = http.createServer app

httpServer.listen PORT, ->
  console.log 'SERVER RUNNING ON ' + PORT
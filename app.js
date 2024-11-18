/* eslint-disable allow */
/**
 * third party libraries
 */
 const bodyParser = require('body-parser')
 const express = require('express')
 const helmet = require('helmet')
 const http = require('http')
 const cors = require('cors')
 /**
  * server configuration
  */

 const environment = 'production'
 
 /**
  * express application
  */
 const app = express()
 const server = http.Server(app)
 
 // allow cross origin requests
 // configure to only allow requests from certain origins
 app.use(cors())
 
//  // secure express app
//  app.use(helmet({
//    dnsPrefetchControl: false,
//    frameguard: false,
//    ieNoOpen: false,
//  }))
 
 // parsing the request bodys
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())
 
 const path = require('path')
 
 app.use(express.static(path.join(__dirname, './', 'build')))
 

 app.get('/*', (req, res) => {
   res.sendFile(path.resolve(__dirname, './build', 'index.html'))
 })
 
 server.listen(8080, 'localhost', (err) => {
     console.log('app running')
   if (
     environment !== 'production' &&
     environment !== 'development' &&
     environment !== 'local'
   ) {
     // eslint-disable-next-line no-console
     console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`)
     process.exit(1)
   }
 })
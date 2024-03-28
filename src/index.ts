import fs from 'fs'
import https from 'https'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import moment from "moment";
moment.locale(process.env.MOMENT_LOCALE || 'id')

import { json } from 'body-parser'
import cors from 'cors'

import dbcon from './configs/dbcon'
import routes from './routes'
import ErrorHandler from './middlewares/ErrorHandler'
import LimiterHandler from './middlewares/LimiterHandler'
import LogRequest from './middlewares/LogRequest'
import ResponseHandler from './middlewares/ResponseHandler'

const NODE_ENV = process.env.NODE_ENV || "development";   // app env
const PORT = process.env.PORT || 8888;  // app port

function StartApp(){
  const app = express()

  // setting up limiter
  app.use(LimiterHandler)
  app.use(json())
  app.use(express.urlencoded({
    extended: false
  }))

  // log all user request
  app.use(LogRequest)

  // handle response
  app.use(ResponseHandler)

  // handle cors
  app.use(
    cors({
      origin: 'http://192.168.0.88',
      optionsSuccessStatus: 200
    })
  )

  // set all the route
  app.use(routes)

  // Add error handling as the last middleware, just prior to our app.listen call.
  // This ensures that all errors are always handled.
  app.use(ErrorHandler);

  if(NODE_ENV === "development"){
    app.listen(PORT, () => {
      console.log(`Running away in public ${NODE_ENV} on line ${PORT}`)
    })
  } else {
    // Start App in Https
    const credential = {
      key: fs.readFileSync('/etc/ssl/your_domain.key'),
      cert: fs.readFileSync('/etc/ssl/your_domain.crt'),
      ca: fs.readFileSync('/etc/ssl/your_domain.ca-bundle.crt'),
    }
    const httpsServer = https.createServer(credential, app)
    httpsServer.listen(
      PORT, 
      () => {
        console.log(`Running away in secret ${NODE_ENV} on line ${PORT}`)
      }
    )
  }
}

// check if database is up or not
// then start the app
dbcon.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.')
    return dbcon.sync()
  })
  .then(() => {
    console.log('All models were synchronized successfully.')
    StartApp()
  })
  .catch((error: any) => {
    console.log("Database fail:", error)
  })
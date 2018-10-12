const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

// include dotenv
require('dotenv').config()

const app = express()

// allow cross-origin requests
app.use(cors())

mongoose.connect(process.env.DB_HOST)
mongoose.connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('connected to database')
})

app.use('/gql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(3888, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3888')
})

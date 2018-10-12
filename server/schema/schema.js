const graphql = require('graphql')
const Location = require('../models/location')
const SideStory = require('../models/sideStory')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql


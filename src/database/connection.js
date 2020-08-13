const knex = require('knex')
const configuration = require('../../knexfile')
const config = configuration.production
const connection = knex(config)

module.exports = connection
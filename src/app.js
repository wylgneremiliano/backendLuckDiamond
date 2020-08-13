const express = require('express')

const routes = require('./routes')
const app = express()
const { errors } = require('celebrate')

app.use(express.json())
app.use(routes)
app.use(errors())

/**
 * Tipo de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, páginação)
 * Route Params: Parâmetros utilizados para identifcar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 * 
 */

module.exports = app
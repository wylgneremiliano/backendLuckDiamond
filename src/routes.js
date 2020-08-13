const express = require('express')

// const SessionController = require('./controllers/SessionController')
const UserController = require('./controllers/UserController')
const SendEmail = require('./controllers/SendEmail')
const routes = express.Router()

// routes.post('/sessions', SessionController.create)
routes.get('/user', UserController.index)
routes.get('/user/:email', UserController.show)
routes.post('/user', UserController.create)
routes.post('/user/updateCoins', UserController.updateCoins)
routes.post('/sendEmail/paymentEmail', SendEmail.paymentEmail)

module.exports = routes
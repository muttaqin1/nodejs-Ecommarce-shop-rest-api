const router = require('express').Router()
const {
    orderController: { createOrder, cancelOrder },
} = require('../controllers')
const { Authentication } = require('../middlewares')
const {
    validators: { validator, src },
} = require('../helpers')
const { CreateOrder, checkOrderId } = require('./schemas/orderSchema')

router.post('/order', Authentication, validator(CreateOrder), createOrder)

router.delete('/order/:orderId', Authentication, validator(checkOrderId, src.PARAM), cancelOrder)

module.exports = router

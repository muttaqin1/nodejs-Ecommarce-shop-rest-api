const joi = require('joi')
module.exports = {
    CreateProduct: joi.object({
        name: joi.string().min(3).max(35).required(),
        description: joi.string().min(20).max(400).required(),
        price: joi.number().required(),
        category: joi.string().max(22).required(),
        unit: joi.number().required(),
        supplier: joi.string().required(),
    }),

    UpdateProduct: joi.object({
        name: joi.string().min(3).max(35),
        description: joi.string().min(20).max(400),
        price: joi.number(),
        category: joi.string().max(22),
        unit: joi.number(),
    }),
    checkProductId: joi.object({
        productId: joi.string().required(),
    }),
    checkOrder: joi.object({
        orderId: joi.string().required(),
    }),
}

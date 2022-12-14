const router = require('express').Router()
const {
    sellerController: {
        createProduct,
        updateProduct,
        deleteProduct,
        completeOrder,
        getAllOrders,
        getMonthlyIncome,
        getStockStatus,
        genDiscountToken,
        getDiscountToken,
    },
} = require('../controllers')
const {
    Authentication,
    roleAuth: { verifyRole, roles },
} = require('../middlewares')
const {
    CreateProduct,
    UpdateProduct,
    checkProductId,
    checkOrder,
    discountToken,
    checkCode,
} = require('./schemas/sellerSchema')
const {
    validators: { validator, src },
    FileUpload: { imageUpload: imageUploader },
} = require('../helpers')

router.post(
    '/products',
    Authentication,
    verifyRole(roles.Seller),
    imageUploader('Banner', 'Banners'),
    validator(CreateProduct),
    createProduct
)
router.put(
    '/products/:productId',
    Authentication,
    verifyRole(roles.Seller),
    imageUploader('Banner', 'Banners'),
    validator(UpdateProduct),
    updateProduct
)
router.delete(
    '/products/:productId',
    Authentication,
    verifyRole(roles.Seller),
    validator(checkProductId, src.PARAM),
    deleteProduct
)
router.put(
    '/orders/complete/:orderId',
    Authentication,
    verifyRole(roles.Seller),
    validator(checkOrder, src.PARAM),
    completeOrder
)
router.post(
    '/token/discount-token',
    Authentication,
    verifyRole(roles.Customer),
    validator(discountToken),
    genDiscountToken
)

router.get('/products/stock/status', Authentication, verifyRole(roles.Seller), getStockStatus)
router.get('/orders/monthly-income', Authentication, verifyRole(roles.Seller), getMonthlyIncome)
router.post('/discount-token', validator(checkCode), getDiscountToken)
router.get('/orders/pending-orders', Authentication, verifyRole(roles.Seller), getAllOrders)
module.exports = router

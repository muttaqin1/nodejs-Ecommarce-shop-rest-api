const router = require('express').Router()

const {
    Authentication,
    rateLimit: { loginLimiter },
} = require('../middlewares')

const {
    authController: {
        signup,
        signin,
        signout,
        tokenRefresh,
        changePassword,
        forgotPassword,
        validateOtp,
        resetPassword,
    },
} = require('../controllers')

const {
    Signin,
    Signup,
    refreshToken,
    otp: { checkEmail, checkOtpId, checkOtp, checkPassword },
    changePass,
} = require('./schemas/authSchema')

const {
    validators: { validator, src },
    FileUpload: { imageUpload },
} = require('../helpers')

router.post('/auth/signup', imageUpload('avatar', 'avatars'), validator(Signup), signup)
router.post('/auth/signin', loginLimiter, validator(Signin), signin)
router.put('/auth/token-refresh', Authentication, validator(refreshToken, src.PARAM), tokenRefresh)
router.put('/auth/change-password', Authentication, validator(changePass), changePassword)
router.delete('/auth/signout', Authentication, signout)
router.post('/auth/forgot-password', validator(checkEmail), forgotPassword)
router.post(
    '/auth/validate-otp/:otpId',
    validator(checkOtpId, src.PARAM),
    validator(checkOtp),
    validateOtp
)
router.post(
    '/auth/reset-password/:otpId',
    validator(checkOtpId, src.PARAM),
    validator(checkPassword),
    resetPassword
)

module.exports = router

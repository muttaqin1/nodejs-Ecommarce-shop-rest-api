const { CustomerRepository } = require('../database')
const customerRepository = new CustomerRepository()
const nodemailer = require('nodemailer')
const { STATUS_CODES, APIError } = require('./AppError')
const codeGenerator = require('./codeGenerator')
const {
    app_name,
    Nodemailer: { SMTP_EMAIL, SMTP_PASSWORD },
} = require('../config')
const sendMail = ({ title, body, reciever }) =>
    new Promise(async (resolve, reject) => {
        try {
            const mailOptions = {
                from: SMTP_EMAIL,
                to: reciever,
                subject: title,
                text: body,
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: SMTP_EMAIL,
                    pass: SMTP_PASSWORD,
                },
                port: 465,
                host: 'smtp@gmail.com',
            })
            const {
                envelope: { to },
            } = await transporter.sendMail(mailOptions)
            if (to.indexOf(reciever) === -1) throw new Error('')
            resolve(true)
        } catch (e) {
            reject(new APIError('API ERROR', STATUS_CODES.INTERNAL_ERROR, 'Failed to send Email!'))
        }
    })

const MailBody = {
    acceptSellerReq: (recieverName, recieverEmail) => {
        return {
            title: 'Congratulations! your seller request has been approved.',
            body: `hi ${recieverName},
          You have unlocked the seller mode of your profile. Now you can showcase your products to sell them.`,
            reciever: recieverEmail,
        }
    },
}

const sendOtp = async (reciever) => {
    try {
        const user = await customerRepository.FindByEmail(reciever)
        if (!user) throw new BadRequestError('Customer is not registered')
        const otp = codeGenerator(6)
        if (!otp) throw new APIError('API ERROR', STATUS_CODES.INTERNAL_ERROR)

        const title = `${otp} is your ${app_name} account recovery code.`
        const body = `Hi ${user.name},
                      We received a request to reset your ${app_name} password.
                      Enter the following code reset your password:
                                  [ ${otp} ]  `

        const sendmail = await sendMail({ title, body, reciever })
        if (!sendmail)
            throw new APIError('API ERROR', STATUS_CODES.INTERNAL_ERROR, 'Failed to send Email.')
        return otp
    } catch (e) {
        throw new APIError('API ERROR', STATUS_CODES.INTERNAL_ERROR, e.message)
    }
}

module.exports = {
    sendMail,
    sendOtp,
    MailBody,
}

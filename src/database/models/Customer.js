const { Schema, model } = require('mongoose')
const customerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        emailVerified: Boolean,
        avatar: {
            url: { type: String, trim: true },
            publicId: { type: String, trim: true },
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        salt: {
            type: String,
            required: true,
            select: false,
        },
        roles: [{ type: Number }],

        address: [{ type: Schema.Types.ObjectId, ref: 'Address', require: true }],

        cart: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                unit: { type: Number, required: true },
            },
        ],
        wishlist: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        ],
        orders: [{ type: Schema.Types.ObjectId, ref: 'Order', required: true }],
        createdAt: {
            type: Date,
            default: Date.now,
            select: false,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
            select: false,
        },
    },
    {
        versionKey: false,
    }
)

const Customer = new model('Customer', customerSchema)
module.exports = Customer

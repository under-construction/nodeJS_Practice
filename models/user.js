const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Person'
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
});

module.exports = mongoose.model('User', userSchema);
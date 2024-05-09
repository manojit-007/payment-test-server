import mongoose from "mongoose";
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;


import { instance } from "../server.js"
import crypto from 'crypto'
import Payment from "../Models/PaymentModel.js";


export const checkOut = async (req, res) => {
    //create order
    const options = {
        amount: Number(req.body.amount * 100),  
        currency: "INR",
        // receipt: "order_rcptid_11"
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success:true,order
    })
}


export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
      console.log("sig rec:" , razorpay_signature);
      console.log("sig gen:" , expectedSignature);
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
  
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      res.redirect(
        `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  };






  //create order
//without receipt res 
// {
//     id: 'order_O84CQJzF6gLZ1L',
//     entity: 'order',
//     amount: 50000,
//     amount_paid: 0,
//     amount_due: 50000,
//     currency: 'INR',
//     receipt: null,
//     offer_id: null,
//     status: 'created',
//     attempts: 0,
//     notes: [],
//     created_at: 1715185990
//   }

//with receipt res 
// {
//     id: 'order_O84DYgw0q4ZKAX',
//     entity: 'order',
//     amount: 50000,
//     amount_paid: 0,
//     amount_due: 50000,
//     currency: 'INR',
//     receipt: 'order_rcptid_11',
//     offer_id: null,
//     status: 'created',
//     attempts: 0,
//     notes: [],
//     created_at: 1715186054
//   }
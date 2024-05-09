import express from 'express'
import { checkOut, paymentVerification } from '../Controllers/PaymentController.js';

const router = express.Router();

router.route('/checkOut').post(checkOut)
router.route('/paymentVerification').post(paymentVerification)
router.route('/getkey')


export default router;
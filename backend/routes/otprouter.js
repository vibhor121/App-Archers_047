import express from 'express';
import { changePassword, emailSender, tikect, verifyOTP } from '../utils/service.js';
import { protect } from '../middlewares/auth.js';

const Otprouter = express.Router();

Otprouter.post('/send-otp', emailSender);
Otprouter.post('/verify-otp', verifyOTP);
Otprouter.post('/change-password', changePassword);
Otprouter.post('/send-ticket',tikect);
export default Otprouter;

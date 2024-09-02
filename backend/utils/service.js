import nodemailer from 'nodemailer';
import 'dotenv/config';
import Customer from '../models/Loginmodel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Temporary store for OTPs
const otpStore = new Map();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

export const emailSender = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Invalid request body. 'email' is required.");
  }
  const userExist = await Customer.findOne({ email });
  if (!userExist) {
    return res.status(400).send("user Not Exist Try To Sign-up");
  }

  const otpCode = generateOTP();
  otpStore.set(email, otpCode); // Store OTP temporarily

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user_email,
      pass: process.env.emailpassword, // Use the app-specific password here
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.user_email, // sender address
      to: email, // list of receivers
      subject: "OTP confirmation", // Subject line
      text: `Hello, your OTP code is ${otpCode}.`, // plain text body
      html: `<p>Your OTP code is <strong>${otpCode}</strong>.</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to send email.");
  }
};
// import jwt from 'jsonwebtoken';

export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send("Invalid request body. 'email' and 'otp' are required.");
  }

  const storedOtp = otpStore.get(email);
  if (storedOtp === otp) {
    otpStore.delete(email); // OTP is valid, remove it from store

    // Generate and sign the JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '12h', 
    });

    // Send the token along with success response
    return res.status(200).json({ message: "OTP verified successfully.", token });
  } else {
    return res.status(400).send("Invalid OTP.");
  }
};

export const changePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).send('Token and new password are required.');
  }
  console.log("user", req.body);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    console.log("decodedEmail", decoded.email);

    const userExist = await Customer.findOne({ email: decoded.email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).send("User does not exist. Try to sign up.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userExist.password = hashedPassword;
    await userExist.save();

    return res.status(200).send('Password changed successfully');
  } catch (error) {
    console.error('Error during password change:', error); // More detailed error logging
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).send('Invalid or malformed token.');
    }
    return res.status(500).send('Failed to change password');
  }
};



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());



export const tikect= (req, res) => {
    const { subject, title, message } = req.body;


    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email from environment variables
        to: "varshithab.008@gmail.com", // Receiver's support email
        subject: `Ticket: ${subject}`, // Updated to use the subject field
        text: `Title: ${title}\nMessage: ${message}` // Updated to include title and message
    };
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.emailpassword
      }
  });
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Ticket submitted successfully.');
        }
    });
}

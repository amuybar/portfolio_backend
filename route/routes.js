const express = require('express');
const router = express.Router();
const sendEmail = require('../mailer');  // Import sendEmail function

const { Message, Request } = require('../model/model');  // Import models

router.post('/message', async (req, res) => {
  const { message, name, email } = req.body;
  try {
    const newMessage = new Message({ message, name, email });
    await newMessage.save();

    // Send confirmation email using sendEmail function
    const emailOptions = {
      from: 'barryreact@gmail.com', // Replace with your email
      to: email,
      subject: 'Portfolio Message Confirmation',
      text: `Thank you ${name} for your message!`,
    };
    await sendEmail(emailOptions);

    res.json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/request', async (req, res) => {
  const { fullName, tel, email } = req.body;
  try {
    const newRequest = new Request({ fullName, tel, email });
    await newRequest.save();

    // Send notification email using sendEmail function
    const emailOptions = {
      from: 'barryreact@gmail.com', // Replace with your email
      to: 'odaribq@gmail.com',  // Replace with recipient email
      subject: 'New Service Request on Portfolio',
      text: `New request from: ${fullName} - ${email}`,
    };
    await sendEmail(emailOptions);

    res.json({ message: 'Request submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

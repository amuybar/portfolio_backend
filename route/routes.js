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
      text: `Thank you ${name} for your message!\n\n
             Hello ${name},\n\n
             Thank you for reaching out regarding my web development services. I'm excited to assist you in bringing your vision to life!\n\n
             I specialize in creating stunning and functional websites tailored to meet your unique needs. Whether you're looking to establish your online presence, revamp an existing website, or develop a custom web application, I've got you covered.\n\n
             With a focus on quality, creativity, and innovation, I ensure that every project is delivered with precision and attention to detail. My goal is not only to meet your expectations but to exceed them, providing you with a website that not only looks great but also drives results.\n\n
             Your satisfaction is my priority, and I'm committed to delivering projects on time and within budget. You can rely on me to communicate effectively, address your concerns promptly, and provide ongoing support even after the project is complete.\n\n
             Feel free to reach out to me via WhatsApp at 0742812483 to discuss your project further or if you have any questions. I'm here to help!\n\n
             Looking forward to the opportunity to work together.\n\n
             Best regards,\n
             Barrack Amuyunzu`,
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
      text: `New request from: ${fullName}\n\n\n ${email}\n\n\n ${tel}`,
    };
    await sendEmail(emailOptions);

    res.json({ message: 'Request submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

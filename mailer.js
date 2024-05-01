const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const credentials = require('./credentials/credentials.json');

async function sendEmail(emailOptions) {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      credentials.web.client_id,
      credentials.web.client_secret,
      credentials.web.redirect_uris[0]
    );

    oAuth2Client.setCredentials({
      refresh_token: credentials.web.refresh_token
    });

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'b2837365@gmail.com',
        clientId: credentials.web.client_id,
        clientSecret: credentials.web.client_secret,
        refreshToken: credentials.web.refresh_token,
        accessToken: accessToken.token // Use accessToken.token
      }
    });

    const info = await transporter.sendMail(emailOptions);
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}

module.exports = sendEmail;

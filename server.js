// Minimal Node.js/Express backend
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' })); // or higher if needed

app.post('/send-email', async (req, res) => {
    const { email, image } = req.body;
    // Validate email and image
    if (!email || !image) return res.status(400).json({ message: 'Missing data' });
    
    // Set up transporter (use your SMTP config)
    const transporter = nodemailer.createTransport({
        host: 'smtp.resend.com',
        port: 587,
        secure: false,
        auth: {
            user: 'resend', // Resend uses 'resend' as the username
            pass: 'api_key' // Replace with your actual Resend API key
        }
    });
    
    await transporter.sendMail({
        from: 'onboarding@resend.dev', // Updated to use Resend test/dev email
        to: email,
        subject: 'Your Chart Image',
        html: '<p>See attached chart image.</p>',
        attachments: [{ filename: 'chart.png', content: image.split('base64,')[1], encoding: 'base64' }]
    });
    
    console.log('Send email worked');
    
    res.json({ message: 'Email sent!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
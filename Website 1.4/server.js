const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Email transporter configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'venndelossantos@gmail.com',
        pass: 'tsbv apor shxa jwev'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { firstName, lastName, username, email, password, address, age, gender } = req.body;

    const mailOptions = {
        from: 'venndelossantos@gmail.com',
        to: 'asiancutie.3A@gmail.com',
        subject: 'New User Registration',
        html: `
            <h2>New User Registration Details</h2>
            <table style="border-collapse: collapse; width: 100%;">
                <tr style="background-color: #f5f5f5;">
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>First Name:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${firstName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Last Name:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${lastName}</td>
                </tr>
                <tr style="background-color: #f5f5f5;">
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Username:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${username}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
                </tr>
                <tr style="background-color: #f5f5f5;">
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Password:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${password}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Address:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${address}</td>
                </tr>
                <tr style="background-color: #f5f5f5;">
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Age:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${age}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Gender:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${gender}</td>
                </tr>
                <tr style="background-color: #f5f5f5;">
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Registration Date:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
                </tr>
            </table>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Registration successful and email sent!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error processing registration' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
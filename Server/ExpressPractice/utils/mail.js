const nodemailer = require("nodemailer");


exports.generateOTP = () => {
    let otp = '';
    for (let i = 0; i <= 3; i++) {
        const randval = Math.round(Math.random() * 9)
        otp = otp + randval
    }
    return otp;
}


exports.mailTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "vb380771@gmail.com",
            pass: "wgld apsu abmy egal",
        },
        secure: true,
        port: 465,

    })
}

exports.generateEmailTemplate = code => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif;">

    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Please Verify Your Email Address</h2>
        <p>To continue with your registration, please verify your email address by entering the following verification code:</p>
        <p style="font-size: 24px; font-weight: bold;">${code}</p>
        <p>If you did not request this verification, you can safely ignore this email.</p>
        <p>Thank you!</p>
    </div>

</body>
</html>
    `
}


exports.plainEmailTemplate = (heading, message) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email</title>
        </head>
        <body style="font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>${heading}</h2>
                <p>${message}</p>
            </div>

        </body>
        </html>
    `;
};

exports.generatePasswordResetTemplate = (url) => {
    return `
    <html>
    <head>
        <title>Password Reset</title>
    </head>
    <body>
        <h1>Password Reset</h1>
        <p>You have requested a password reset. Please click the link below to reset your password:</p>
        <a href="${url}">${url}</a>
        <p>If you did not request a password reset, you can ignore this email.</p>
    </body>
    </html>
    `;
};

exports.plainEmailTemplate = (heading, message) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email</title>
        </head>
        <body style="font-family: Arial, sans-serif;">

            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>${heading}</h2>
                <p>${message}</p>
            </div>

        </body>
        </html>
    `;
};
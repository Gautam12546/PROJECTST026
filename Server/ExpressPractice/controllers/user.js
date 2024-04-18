
const User = require("../model/mongodb");
const verificationToken = require("../model/verificationToken");
const ResetToken = require("../model/resetToken");
const { sendError, createRandomByts } = require("../utils/helper");
const jwt = require("jsonwebtoken");
const { generateOTP, mailTransporter, generateEmailTemplate, plainEmailTemplate, generatePasswordResetTemplate } = require("../utils/mail");
const { isValidObjectId } = require("mongoose");

const crypto = require('crypto');
const resetToken = require("../model/resetToken");

exports.createUser = async (req, res) => {
    try {
        const transporter = mailTransporter();

        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return sendError(res, "Email is already in use", 400);
        }
        const newUser = new User({
            name,
            email,
            password
        });

        const OTP = generateOTP();
        if (!OTP) {
            return sendError(res, "Failed to generate OTP", 500);
        }

        await transporter.sendMail({
            from: "vb380771@gmail.com",
            to: newUser.email,
            subject: "Verify your email account",
            html: generateEmailTemplate(OTP),
        });

        const newVerificationToken = new verificationToken({
            owner: newUser._id,
            token: OTP
        });
        await newVerificationToken.save();
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return sendError(res, "Error creating user", 500);
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email.trim() || !password.trim()) {
            return sendError(res, "Email/password is missing", 400);
        }
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return sendError(res, "User not found", 404);
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT secret key is not defined");
            // Handle the case where JWT_SECRET is not defined
            process.exit(1); // Exit the application or handle the error appropriately
        }

        const isMatch = await foundUser.comparePassword(password);
        if (!isMatch) {
            return sendError(res, "Incorrect password", 401);
        }
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({
            success: true,
            user: {
                name: foundUser.name,
                email: foundUser.email,
                id: foundUser._id,
                token: token
            }
        });
    } catch (error) {
        console.error("Error signing in:", error);
        return sendError(res, "Error signing in", 500);
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const transporter = mailTransporter();


        const { userId, otp } = req.body;
        if (!userId || !otp.trim()) return sendError(res, "Invalid request/missing parameter!");
        if (!isValidObjectId(userId)) return sendError(res, "Invalid userid");

        const user = await User.findById(userId);
        if (!user) return sendError(res, "Sorry, user not found");

        if (user.verified) return sendError(res, "Account is already verified");

        const token = await verificationToken.findOne({ owner: user._id });
        if (!token) return sendError(res, "Sorry, user not found");

        const isMatched = await token.compareToken(otp);
        if (!isMatched) return sendError(res, "Invalid code");

        user.verified = true;
        await verificationToken.findByIdAndDelete(token._id);
        await user.save();

        await transporter.sendMail({
            from: "vb380771@gmail.com",
            to: user.email,
            subject: "verify your email account",
            html: plainEmailTemplate("Email Verified Successfully", "Thank you for verifying your email."),
        });

        res.json({ success: true, message: "Your email has been verified" });
    } catch (error) {
        console.error("Error verifying email:", error);
        return sendError(res, "Error verifying email", 500);
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const transporter = mailTransporter();

        const { email } = req.body;
        if (!email) return sendError(res, "Please provide a valid email");

        const user = await User.findOne({ email });
        if (!user) return sendError(res, "User not found");

        const token = await ResetToken.findOne({ owner: user._id });
        if (token) return sendError(res, "Code is valid for only 10 minutes");

        const randomBytes = await createRandomByts();
        const newResetToken = new ResetToken({ owner: user._id, token: randomBytes });

        await newResetToken.save();

        await transporter.sendMail({
            from: "vb380771@gmail.com",
            to: user.email,
            subject: "Password Reset",
            html: generatePasswordResetTemplate(`http://localhost:4000/resetPassword?token=${randomBytes}&id=${user._id}`)
        });

        res.json({ success: true, message: "Password reset link has been sent to your email" });
    } catch (error) {
        console.error("Error sending password reset email:", error);
        return sendError(res, "Error sending password reset email", 500);
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const transporter = mailTransporter();
        const { password } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return sendError(res, "User not found", 404);
        }
        const isSamePassword = await user.comparePassword(password);
        if (isSamePassword) {
            return sendError(res, "Please enter a different password", 400);
        }
        if (password.trim().length < 8 || password.trim().length > 12) {
            return sendError(res, "Password must be 8 to 12 characters", 400);
        }
        user.password = password.trim();
        await user.save();
        await ResetToken.findOneAndDelete({ owner: user._id });
        await transporter.sendMail({
            from: "vb380771@gmail.com",
            to: user.email,
            subject: "Password Reset Successfully",
            html: plainEmailTemplate("Password reset successfully", "Now you can login with your new password!"),
        });

        res.json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        return sendError(res, "Error resetting password", 500);
    }
}
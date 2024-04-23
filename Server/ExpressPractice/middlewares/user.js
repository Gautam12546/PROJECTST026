const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helper");
const User = require('../model/mongodb');
const ResetToken = require('../model/resetToken');

exports.isResetTokenValid = async (req, res, next) => {
    try {
        const { token, id } = req.query;
        if (!token || !id) {
            return sendError(res, "Invalid request: Token and ID are required.");
        }
        if (!isValidObjectId(id)) {
            return sendError(res, "Invalid user ID.");
        }
        const user = await User.findById(id);
        if (!user) {
            return sendError(res, "User not found.");
        }
        const resetToken = await ResetToken.findOne({ owner: user._id });
        if (!resetToken) {
            return sendError(res, "Reset token not found.");
        }
        const isValidToken = await resetToken.compareToken(token);
        if (!isValidToken) {
            return sendError(res, "Invalid reset token.");
        }

        req.user = user;
        next(); 
    } catch (error) {
        console.error("Error in reset token validation:", error);
        return sendError(res, "Internal server error.", 500);
    }
};

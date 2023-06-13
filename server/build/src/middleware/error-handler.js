"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    });
};
exports.default = ErrorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => {
    try {
        const { body, query, params } = req;
        schema.parse({ body, query, params });
        return next();
    }
    catch (e) {
        return res.status(400).send(e.errors);
    }
};
exports.default = validate;

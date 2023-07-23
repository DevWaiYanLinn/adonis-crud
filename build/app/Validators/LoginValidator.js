"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class LoginValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string(),
            password: Validator_1.schema.string(),
        });
        this.messages = {
            'email.required': 'The email is required',
            'password.required': 'The password is required',
        };
    }
}
exports.default = LoginValidator;
//# sourceMappingURL=LoginValidator.js.map
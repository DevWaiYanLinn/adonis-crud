"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class RegisterValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string([Validator_1.rules.minLength(5)]),
            email: Validator_1.schema.string([Validator_1.rules.email(), Validator_1.rules.unique({ table: 'users', column: 'email' })]),
            password: Validator_1.schema.string([Validator_1.rules.minLength(10)]),
        });
        this.messages = {
            'email.required': 'The email is required',
            'password.required': 'The password is required',
            'email.unique': 'The email is already exists'
        };
    }
}
exports.default = RegisterValidator;
//# sourceMappingURL=RegisterValidator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class PostValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            title: Validator_1.schema.string([Validator_1.rules.minLength(5)]),
            body: Validator_1.schema.string([Validator_1.rules.minLength(10)]),
        });
        this.messages = {};
    }
}
exports.default = PostValidator;
//# sourceMappingURL=PostValidator.js.map
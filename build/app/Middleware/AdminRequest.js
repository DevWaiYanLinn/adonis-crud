"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminRequest {
    async handle({ auth, response }, next) {
        if (auth.user?.user_type !== 'admin') {
            return response.redirect().toRoute('AuthController.getLogin');
        }
        await next();
    }
}
exports.default = AdminRequest;
//# sourceMappingURL=AdminRequest.js.map
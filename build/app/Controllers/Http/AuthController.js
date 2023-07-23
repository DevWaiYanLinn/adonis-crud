"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const LoginValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/LoginValidator"));
const RegisterValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/RegisterValidator"));
class AuthController {
    getLogin({ view }) {
        return view.render('auth/login');
    }
    getRegister({ view }) {
        return view.render('auth/register');
    }
    async postRegister({ request, response }) {
        await request.validate(RegisterValidator_1.default);
        const user = new User_1.default();
        user.email = request.input('email');
        user.password = request.input('password');
        await user.save();
        response.redirect().toRoute('AuthController.getLogin');
    }
    async postLogin({ request, auth, response }) {
        await request.validate(LoginValidator_1.default);
        const email = request.input('email');
        const password = request.input('password');
        await auth.use('web').attempt(email, password);
        response.redirect().toRoute('UsersController.getAll');
    }
    async postLogout({ auth, response }) {
        await auth.use('web').logout();
        response.redirect().toRoute('UsersController.getAll');
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map
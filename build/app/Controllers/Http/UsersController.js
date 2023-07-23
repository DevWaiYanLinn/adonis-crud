"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const CreateUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateUserValidator"));
class UsersController {
    create({ view }) {
        return view.render('users/create');
    }
    async getAll({ view }) {
        const users = await User_1.default.all();
        return view.render('users/index', {
            users,
        });
    }
    async store({ request, response, session }) {
        await request.validate(CreateUserValidator_1.default);
        const name = request.input('name');
        const email = request.input('email');
        const password = request.input('password');
        const user = new User_1.default();
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();
        session.flash('success', 'User created successfully.');
        response.redirect().toRoute('UsersController.getAll');
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const CreateUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateUserValidator"));
const UpdateUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/UpdateUserValidator"));
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
        session.flash('success', 'The user is created.');
        response.redirect().toRoute('UsersController.getAll');
    }
    async edit({ view, request }) {
        const user = await User_1.default.query().where('id', request.param('id')).firstOrFail();
        return view.render('users/edit', {
            user,
        });
    }
    async update({ request, response, session }) {
        await request.validate(UpdateUserValidator_1.default);
        await User_1.default.query()
            .where('id', request.param('id'))
            .update({
            name: request.input('name'),
            email: request.input('email'),
            password: request.input('password'),
        });
        session.flash('success', 'The user is updated.');
        response.redirect().toRoute('UsersController.getAll');
    }
    async destroy({ request, session, response, auth }) {
        if (Number(auth.user?.id) === Number(request.param('id'))) {
            session.flash('danger', 'The use deleting is failed');
            return response.redirect().toRoute('UsersController.getAll');
        }
        await User_1.default.query().where('id', request.param('id')).delete();
        session.flash('success', 'The user is deleted');
        response.redirect().toRoute('UsersController.getAll');
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map
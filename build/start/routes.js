"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
Route_1.default.get('/auth/login', 'AuthController.getLogin').as('AuthController.getLogin');
Route_1.default.post('/auth/login', 'AuthController.postLogin').as('AuthController.postLogin');
Route_1.default.get('/auth/register', 'AuthController.getRegister').as('AuthController.getRegister');
Route_1.default.post('/auth/register', 'AuthController.postRegister').as('AuthController.postRegister');
Route_1.default.post('/auth/logout', 'AuthController.postLogout').as('AuthController.postLogout');
Route_1.default.group(() => {
    Route_1.default.get('/users', 'UsersController.getAll').as('UsersController.getAll');
    Route_1.default.get('/users/create', 'UsersController.create').as('UsersController.create');
    Route_1.default.post('/users/store', 'UsersController.store').as('UsersController.store');
    Route_1.default.get('/posts/create', 'PostsController.create').as('PostsController.create');
    Route_1.default.get('/posts', 'PostsController.getAll').as('PostsController.getAll');
    Route_1.default.post('/posts/store', 'PostsController.store').as('PostsController.store');
}).middleware('isAdmin');
Route_1.default.get('/demo-login', async ({ auth, response }) => {
    const user = await User_1.default.query().where('user_type', 'admin').firstOrFail();
    await auth.use('web').login(user);
    response.redirect().toRoute('UsersController.getAll');
});
Route_1.default.get('/', ({ response }) => {
    response.redirect().toRoute('UsersController.getAll');
});
Route_1.default.get('/demo-logout', async ({ auth, response }) => {
    await auth.use('web').logout();
    response.redirect().toRoute('UsersController.getAll');
});
//# sourceMappingURL=routes.js.map
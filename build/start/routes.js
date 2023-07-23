"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/auth/login', 'AuthController.getLogin').as('AuthController.getLogin');
Route_1.default.post('/auth/login', 'AuthController.postLogin').as('AuthController.postLogin');
Route_1.default.get('/auth/register', 'AuthController.getRegister').as('AuthController.getRegister');
Route_1.default.post('/auth/register', 'AuthController.postRegister').as('AuthController.postRegister');
Route_1.default.post('/auth/logout', 'AuthController.postLogout').as('AuthController.postLogout');
Route_1.default.group(() => {
    Route_1.default.get('/users', 'UsersController.getAll').as('UsersController.getAll');
    Route_1.default.get('/users/create', 'UsersController.create').as('UsersController.create');
    Route_1.default.post('/users/store', 'UsersController.store').as('UsersController.store');
    Route_1.default.get('/users/edit/:id', 'UsersController.edit').as('UsersController.edit');
    Route_1.default.put('/users/:id', 'UsersController.update').as('UsersController.update');
    Route_1.default.delete('/users/:id', 'UsersController.destroy').as('UsersController.destroy');
    Route_1.default.get('/posts/create', 'PostsController.create').as('PostsController.create');
    Route_1.default.get('/posts', 'PostsController.getAll').as('PostsController.getAll');
    Route_1.default.post('/posts/store', 'PostsController.store').as('PostsController.store');
    Route_1.default.get('/posts/edit/:id', 'PostsController.edit').as('PostsController.edit');
    Route_1.default.put('/posts/:id', 'PostsController.update').as('PostsController.update');
    Route_1.default.delete('/posts/:id', 'PostsController.destroy').as('PostsController.destroy');
}).middleware('isAdmin');
//# sourceMappingURL=routes.js.map
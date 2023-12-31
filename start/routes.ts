/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/
import Route from '@ioc:Adonis/Core/Route'

Route.get('/auth/login', 'AuthController.getLogin').as('AuthController.getLogin')
Route.post('/auth/login', 'AuthController.postLogin').as('AuthController.postLogin')
Route.get('/auth/register', 'AuthController.getRegister').as('AuthController.getRegister')
Route.post('/auth/register', 'AuthController.postRegister').as('AuthController.postRegister')
Route.post('/auth/logout', 'AuthController.postLogout').as('AuthController.postLogout')

Route.group(() => {
  Route.get('/users', 'UsersController.getAll').as('UsersController.getAll')
  Route.get('/users/create', 'UsersController.create').as('UsersController.create')
  Route.post('/users/store', 'UsersController.store').as('UsersController.store')
  Route.get('/users/edit/:id', 'UsersController.edit').as('UsersController.edit')
  Route.put('/users/:id', 'UsersController.update').as('UsersController.update')
  Route.delete('/users/:id', 'UsersController.destroy').as('UsersController.destroy')

  Route.get('/posts/create', 'PostsController.create').as('PostsController.create')
  Route.get('/posts', 'PostsController.getAll').as('PostsController.getAll')
  Route.post('/posts/store', 'PostsController.store').as('PostsController.store')
  Route.get('/posts/edit/:id', 'PostsController.edit').as('PostsController.edit')
  Route.put('/posts/:id', 'PostsController.update').as('PostsController.update')
  Route.delete('/posts/:id', 'PostsController.destroy').as('PostsController.destroy')
}).middleware('isAdmin')

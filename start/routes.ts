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
import User from 'App/Models/User'

Route.get('/auth/login', 'AuthController.getLogin').as('AuthController.getLogin')
Route.post('/auth/login', 'AuthController.postLogin').as('AuthController.postLogin')

Route.get('/users', 'UsersController.getAll').as('UsersController.getAll').middleware('isAdmin')

Route.get('/demo-login', async ({ auth, response }) => {
  const user = await User.query().where('user_type', 'admin').firstOrFail()
  await auth.use('web').login(user)
  response.redirect().toRoute('UsersController.getAll')
})

Route.get('/demo-logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect().toRoute('UsersController.getAll')
})

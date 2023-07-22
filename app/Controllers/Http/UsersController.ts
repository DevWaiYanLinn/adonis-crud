import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  public create({ view }: HttpContextContract) {
    return view.render('create-users')
  }

  public async getAll({ view }: HttpContextContract) {
    const users = await User.all()
    return view.render('users/index', {
      users,
    })
  }

  public async store({ request , response}: HttpContextContract) {
    await request.validate(CreateUserValidator)
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')
    const user = new User()
    user.name = name
    user.email = email
    user.password = await Hash.make(password)
    user.save()
    return response.redirect().toRoute('user.getAll')
  }
}

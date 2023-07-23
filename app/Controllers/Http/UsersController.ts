import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public create({ view }: HttpContextContract) {
    return view.render('users/create')
  }

  public async getAll({ view }: HttpContextContract) {
    const users = await User.all()
    return view.render('users/index', {
      users,
    })
  }

  public async store({ request, response, session }: HttpContextContract) {
    await request.validate(CreateUserValidator)
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')
    const user = new User()
    user.name = name
    user.email = email
    user.password = password
    await user.save()
    session.flash('success', 'The user is created.')
    response.redirect().toRoute('UsersController.getAll')
  }

  public async edit({ view, request }: HttpContextContract) {
    const user = await User.query().where('id', request.param('id')).firstOrFail()
    return view.render('users/edit', {
      user,
    })
  }

  public async update({ request, response, session }: HttpContextContract) {
    await request.validate(UpdateUserValidator)
    await User.query()
      .where('id', request.param('id'))
      .update({
        name: request.input('name'),
        email: request.input('email'),
        password: request.input('password'),
      })
    session.flash('success', 'The user is updated.')
    response.redirect().toRoute('UsersController.getAll')
  }

  public async destroy({ request, session, response, auth }: HttpContextContract) {
    if (Number(auth.user?.id) === Number(request.param('id'))) {
      session.flash('danger', 'The use deleting is failed')
      return response.redirect().toRoute('UsersController.getAll')
    }
    await User.query().where('id', request.param('id')).delete()
    session.flash('success', 'The user is deleted')
    response.redirect().toRoute('UsersController.getAll')
  }
}

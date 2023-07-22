import { response } from 'express'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  
  public getLogin({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public getRegister({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async postRegister({ request, response }: HttpContextContract) {
    await request.validate(RegisterValidator)
    const user = new User()
    user.email = request.input('email')
    user.password = request.input('password')
    await user.save()
    response.redirect().toRoute('AuthController.getLogin')
  }

  public async postLogin({ request, auth, response }: HttpContextContract) {
    await request.validate(LoginValidator)
    const email = request.input('email')
    const password = request.input('password')
    await auth.use('web').attempt(email, password)
    response.redirect().toRoute('UsersController.getAll')
  }

  public async postLogout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect().toRoute('UsersController.getAll')
  }
}

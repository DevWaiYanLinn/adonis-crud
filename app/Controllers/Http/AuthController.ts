import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public getLogin({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async postLogin({ request, auth , response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    await auth.use('web').attempt(email, password)
    response.redirect().toRoute('UsersController.getAll')
  }
}

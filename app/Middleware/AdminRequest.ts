import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminRequest {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.user?.user_type !== 'admin') {
      return response.redirect().toRoute('AuthController.getLogin')
    }
    await next()
    // code for middleware goes here. ABOVE THE NEXT CALL
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  public async getAll({view}:HttpContextContract) {
    const posts = await Post.query().preload('user')
    console.log(posts)
    return view.render('posts/index', {
        posts
    })
  }

  public async store({ request, auth, response}: HttpContextContract) {
    await request.validate(PostValidator)
    const post = new Post();
    post.title= request.input('title');
    post.body = request.input('body');
    if(auth.user?.id) {
        post.user_id = auth.user.id
    }
    await post.save();
    response.redirect().toRoute('PostsController.getAll')
  }
}

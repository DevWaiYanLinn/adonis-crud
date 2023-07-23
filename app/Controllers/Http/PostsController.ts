import { response } from 'express'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  public async getAll({ view }: HttpContextContract) {
    const posts = await Post.query().preload('user')
    return view.render('posts/index', {
      posts,
    })
  }

  public async store({ request, auth, response, session }: HttpContextContract) {
    await request.validate(PostValidator)
    const post = new Post()
    post.title = request.input('title')
    post.body = request.input('body')
    if (auth.user?.id) {
      post.user_id = auth.user.id
    }
    await post.save()
    session.flash('success', 'The Post is created successfully')
    response.redirect().toRoute('PostsController.getAll')
  }

  public async edit({ request, view }: HttpContextContract) {
    const post = await Post.query().where('id', request.param('id')).firstOrFail()
    return view.render('posts/edit', { post })
  }

  public async update({ request, response, session }: HttpContextContract) {
    await Post.query()
      .where('id', request.param('id'))
      .update({
        title: request.input('title'),
        body: request.input('body'),
      })
    session.flash('success', 'The post is updated')
    response.redirect().toRoute('PostsController.getAll')
  }

  public async destroy({ request, response, session }: HttpContextContract) {
    await Post.query().where('id', request.param('id')).delete()
    session.flash('success', 'The post is deleted')
    response.redirect().toRoute('PostsController.getAll')
  }
}

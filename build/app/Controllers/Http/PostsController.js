"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
const PostValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/PostValidator"));
class PostsController {
    async create({ view }) {
        return view.render('posts/create');
    }
    async getAll({ view }) {
        const posts = await Post_1.default.query().preload('user');
        return view.render('posts/index', {
            posts,
        });
    }
    async store({ request, auth, response, session }) {
        await request.validate(PostValidator_1.default);
        const post = new Post_1.default();
        post.title = request.input('title');
        post.body = request.input('body');
        if (auth.user?.id) {
            post.user_id = auth.user.id;
        }
        await post.save();
        session.flash('success', 'The Post is created successfully');
        response.redirect().toRoute('PostsController.getAll');
    }
    async edit({ request, view }) {
        const post = await Post_1.default.query().where('id', request.param('id')).firstOrFail();
        return view.render('posts/edit', { post });
    }
    async update({ request, response, session }) {
        await Post_1.default.query()
            .where('id', request.param('id'))
            .update({
            title: request.input('title'),
            body: request.input('body'),
        });
        session.flash('success', 'The post is updated');
        response.redirect().toRoute('PostsController.getAll');
    }
    async destroy({ request, response, session }) {
        await Post_1.default.query().where('id', request.param('id')).delete();
        session.flash('success', 'The post is deleted');
        response.redirect().toRoute('PostsController.getAll');
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map
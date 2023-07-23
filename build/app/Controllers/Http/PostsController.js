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
        console.log(posts);
        return view.render('posts/index', {
            posts
        });
    }
    async store({ request, auth, response }) {
        await request.validate(PostValidator_1.default);
        const post = new Post_1.default();
        post.title = request.input('title');
        post.body = request.input('body');
        if (auth.user?.id) {
            post.user_id = auth.user.id;
        }
        await post.save();
        response.redirect().toRoute('PostsController.getAll');
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map
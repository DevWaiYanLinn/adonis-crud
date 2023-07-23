"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class default_1 extends Seeder_1.default {
    async run() {
        await User_1.default.createMany([
            {
                name: 'Charles',
                email: 'Charles@gmail.com',
                password: 'secret-password',
            },
            {
                name: 'Jhon Smick',
                email: 'jhonsmick@gmail.com',
                password: 'secret-password',
            },
            {
                name: 'Henry',
                email: 'henry@gmail.com',
                password: 'secret-password',
            },
            {
                name: 'admin',
                email: 'admin@gmail.com',
                password: 'secret-password',
                user_type: 'admin',
            },
        ]);
    }
}
exports.default = default_1;
//# sourceMappingURL=User.js.map
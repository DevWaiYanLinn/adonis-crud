import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
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
    ])
  }
}

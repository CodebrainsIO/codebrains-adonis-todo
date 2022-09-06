import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({}: HttpContextContract) {
    const todos = await Todo.all()
    return todos.map((todo) => todo.serialize())
  }

  public async store({ request }: HttpContextContract) {
    const todo = await Todo.create({
      title: request.input('title'),
      completed: request.input('completed'),
    });

    return todo.serialize();
  }

  public async show({ params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    return todo.serialize()
  }

  public async update({ params, request }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    todo.title = request.input('title')
    todo.completed = request.input('completed')
    await todo.save()
    return todo.serialize()
  }

  public async destroy({params}: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()
    return { message: 'Todo deleted' }
  }
}

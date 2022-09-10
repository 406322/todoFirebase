import mongoose from 'mongoose';
import Todo from "../../db/models"
import type { NextApiRequest, NextApiResponse } from "next";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0gu0gwe.mongodb.net/TodoList?retryWrites=true&w=majority`

mongoose.connect(uri)
    .then(() => console.log('Mongoose is connected'))
    .catch((error: Error) => console.log(error))

const createNewTodo = (data: any) => {
    const newTodo = new Todo({
        todo: data.todo,
        id: data.id,
        isComplete: data.isComplete,
        isEdit: data.isEdit,
    })
    return newTodo;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        try {
            return Todo.find()
                .then((result) => res.send(result))
                .catch((error) => console.log(error))
        }
        catch (error) { console.log(error) }
    }

    else if (req.method === 'POST') {
        const newTodo = createNewTodo(req.body)
        newTodo.save()
        console.log('Todo added to database')
        res.status(201).json(newTodo)
    }

    else if (req.method === 'DELETE') {
        const id = req.body.id;
        Todo.deleteOne({ id: id }, function (error) {
            if (error) { console.log(error) }
            else if (!error) { console.log('Todo deleted from database') }
        });
        res.status(200).json(id)
    }

    else if (req.method === 'PUT') {
        const filter = { id: req.body.id };
        let update;
        if (req.body.todo) { update = { todo: req.body.todo } }
        else { update = { isComplete: req.body.isComplete } }
        let doc = await Todo.findOneAndUpdate(filter, update, { new: true });
        console.log('Todo updated in database')
        res.send(200)
    }

    else {
        res.status(500).json({ Message: 'Something went wrong' })
        return res.end()
    }

}
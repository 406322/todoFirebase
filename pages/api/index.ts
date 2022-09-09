import mongoose from 'mongoose';
import Todo from "../../db/models"
import { v4 as uuidv4 } from 'uuid';
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
        console.log('GET')
        console.log(req.body)
        // try {
        //     const user = req.query.id
        //     return Todo.find()
        //         .then((result) => res.send(result))
        //         .catch((error) => console.log(error))
        // }
        // catch (error) { console.log(error) }
        }
        
    if (req.method === 'POST') {
        const newEntry = createNewTodo(req.body)
        newEntry.save()
        res.status(201).json(newEntry)
        }
        
        else {
        res.status(500).json({ Message: 'Something went wrong' })
        return res.end()
        }
    


 }
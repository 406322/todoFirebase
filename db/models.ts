import { Schema, model, models } from 'mongoose';

const schema = new Schema({
    todo: {
        type: 'string',
        required: true
    },
    id: {
        type: 'string',
        required: true
    },
    isComplete: {
        type: 'boolean',
        required: true
    },
    isEdit: {
        type: 'boolean',
        required: true
    },

}, { timestamps: true })

const Todo = models.Todo || model('Todo', schema);

export default Todo;
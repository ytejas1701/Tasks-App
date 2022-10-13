import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        trim: true,
    },
    description: { 
        type: String,
        required: false,
        trim: true,
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    dueDate: {
        type: Date,
        required:false,
    }
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

export { Task };
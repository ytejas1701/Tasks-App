import express from "express";
import { auth } from '../middleware/auth.js'
import { Task } from '../models/task.js';

const router = new express.Router();

// create task
router.post('/tasks',
    auth,
    async ({ body, user }, res)=>{
        try{
            const result = await new Task({
                ...body, 
                author:user._id,
            }).save();
            res.status(201).send(result);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });

// read all tasks 
router.get('/tasks',
    auth,
    async ({ user, query }, res)=>{
        try{
            await user.populate({
                path: 'myTasks',
                match: query.completed 
                        ? { completed: query.completed === 'true' } 
                        : {},
                options: {
                    limit: parseInt(query.limit),
                    skip: parseInt(query.skip),
                }
            });
            res.status(200).send(user.myTasks);
        }catch(error){
            res.status(500).send(error);
        }
     });

// read a task
router.get('/tasks/:id',
    auth,
    async ({ user, params }, res)=>{
        try{
            const task = await Task.findOne({
                _id: params.id,
                author: user._id,
            });
            if(!task){return res.send(404).send();}
            res.status(200).send(task);
        }catch(error){
            res.status(500).send(error);
        }
    });

// update a task
router.patch('/tasks/:id',
    auth,
    async ({ user, params, body }, res)=>{
        try{
            const task = await Task.findOneAndUpdate(
                {
                    _id:params.id,
                    author:user._id,
                }, 
                body, 
                {
                    new: true, 
                    runValidators: true
                });
            if(!task){return res.send(404).send();}
            res.send(task);
        }catch(error){
            res.status(400).send(error);
        }
    });

// delete a task
router.delete('/tasks/:id',
    auth,
    async ({ user, params }, res)=>{
        try{
            const task = await Task.findOneAndDelete(
                {
                    _id:params.id,
                    author:user._id,
            });
            if(!task){return res.status(404).send();}
            res.send(task);
        }catch(error){
            res.status(500).send(error);
        }
    });

export { router };

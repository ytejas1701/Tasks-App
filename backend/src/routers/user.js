import express from "express";
import { auth } from '../middleware/auth.js'
import { Task } from "../models/task.js";
import { User } from '../models/user.js';

const router = new express.Router();

//signup
router.post('/users',
    async ({ body }, res)=>{
        try{
            const user = await new User(body).save();
            await user.generateAuthToken();
            res.send(user);
        }catch(error){
            res.status(400).send(error);
        }
    });

//login
router.post('/users/login',
    async ({ body }, res)=>{
        try{
            const user = await User.findbyEmail(body.email, body.password);
            await user.generateAuthToken();
            res.send(user);
        }catch(error){
            res.status(400).send(error);
        }
    });

//logout
router.post(
    '/users/logout',
    auth,
    async (req, res)=>{
        try{
            req.user.token = '';
            await req.user.save();
            res.send();
        }catch(error){
            req.status(500).send();
        }
    });

//read me
router.get('/me',
    auth,
    (req, res)=>{
        res.send(req.user);
    });

//read all users
router.get('/users',
    auth,
    async (req, res)=>{
        try{
            const users = await User.find({});
            res.status(200).send(users);
        }catch(error){
            res.status(500).send(error);
        }
    });

// edit me
router.patch(
    '/users/me',
    auth,
    async ({ user, body }, res)=>{
        try{
            user = await User.findByIdAndUpdate(
                user._id,
                body,
                {
                    new: true,
                    runValidators: true,
                });
                res.send(user);
        }catch(error){
            res.status(400).send(error);
        }
    });


// delete me
router.delete(
    '/users/me',
    auth,
    async ({ user }, res)=>{
        try{
            await Task.deleteMany({
                author:user._id,
            });
            await user.delete();
            res.send(user);
        }catch(error){
            res.status(500).send(error);
        }
    });

export { router };

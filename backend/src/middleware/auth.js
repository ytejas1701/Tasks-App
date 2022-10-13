import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'lifesucks');
        const user = await User.findOne({_id: decoded._id, token: token});
        if(!user){throw new Error();}
        req.token = token;
        req.user = user;
        next();
    }catch(error){
        res.status(401).send({error:"FUCK OFF"})
    }
}

export { auth }
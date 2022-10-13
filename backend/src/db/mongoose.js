import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/tasks-app-api', 
    { useNewUrlParser: true }).then((result)=>{
        console.log('mongoose connected on server '+ 27017);
    }).catch((error)=>{
        console.log(error);
    });

export { mongoose };


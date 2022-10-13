import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({ 
    name: { 
        type: String,
        trim: true,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        immutable: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('invalid email');
            }
        }
    },
    password: { 
        type: String,
        trim: true,
        required: true,
        immutable: true,
        validate(value) {
            if(value.length<=6){
                throw new Error('length of password must be greater than 6');
            }
        }  
    },
    token: {
        type: String,
        default: '',
    }
});

userSchema.virtual('myTasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'author',
});

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    // delete userObject.password;
    // delete userObject.token;

    return userObject;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'lifesucks');
    user.token = token;
    user.save();
}

userSchema.statics.findbyEmail = async (email, password) => {
    try{
        const user = await User.findOne({email});
        if(!user){
            throw new Error('unable to login');
        }
        if(user.password !== password ){
            throw new Error('unable to login');
        }
        return user;
    }catch(error){
        throw new Error(error);
    }

}

const User = mongoose.model('User', userSchema);

export { User };
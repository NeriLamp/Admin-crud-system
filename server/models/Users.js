const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema ({ 
    name:{ 
        type:String, 
        required:true, 
    }, 
    age:{ 
        type:Number, 
        required:true, 
    }, 
    username:{ 
        type:String, 
        required:true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true,   
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },
    birthYear: {
        type: String, 
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/, 
    }
 }) 
 const UserModel = mongoose.model("users", UserSchema);
 module.exports=UserModel; 

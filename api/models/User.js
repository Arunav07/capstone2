const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        min: 6,
        max:20,
        unique: true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique: true
    },
    password:{
        type:String,
        min:8,
        required:true,
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]

    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc:{
        type:String,
        max: 50,
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    age:{
        type:Number,
        enum :[1,2,3],
    },
},
{timestamps: true}
)

UserSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})


module.exports = mongoose.model("User",UserSchema)
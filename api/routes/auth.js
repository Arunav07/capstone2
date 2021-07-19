const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


//REGISTER
router.post("/register", async (req, res) => {
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, 
    });
    
    //save user and return response
    try{
    const user = await newUser.save();
        res.status(200).json(user)

    
    }catch(err){
        console.log(err)
    }
    try{
        
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
        
        //create new user
        
    res.status(200).json(user);
    } catch(err){
        res.status(500).json(err)
    }
});

//LOGIN
router.post("/login", async (req, res)=> {
    try{
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("User not Found");
        console.log(req.body.password, user.password)
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong password")
        
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)    
    }
});

module.exports = router
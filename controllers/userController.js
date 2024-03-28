const asyncHandler = require("express-async-handler")
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const User = require('../models/userModel');

//@desc register a users
//@route POOST /api/user/register
//@access public

const registerUser = asyncHandler(async (req,res) =>{
    const {username, phone, password} = req.body;
    if(!username || !phone || !password){
        res.status(400);
        throw new Error("All fields are mandatory !!")
    }
    const userAvailable = await User.findOne({phone});
    if(userAvailable){
        res.status(400);
        throw new Error("user already register")
    }

 //Hash passoword
 const hasdedPassword = await bcrypt.hash(password, 10);
 console.log(hasdedPassword)
 const user = await User.create({
    username,
    phone,
    password: hasdedPassword,
 });
   console.log(`user created succesfully ${user}`);
   if(user){
    res.status(201).json({_id: user.id, phone: user.phone});
   }else{
    res.status(400)
    throw new Error("user data is not valide")
   }
    res.json({ message: "register the user "});
});


//@desc login a users
//@route POOST /api/user/login
//@access public

const loginUser = asyncHandler(async (req,res) =>{
     const {phone, password} = req.body;
     if(!phone || ! password){
        res.status(400);
        throw new Error("all fields is mandory")
     }
     const user = await User.findOne({phone});
     //compre the hsh pass with users password
     if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                phone: user.phone,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
           {expiresIn: "5m"}
         );
        res.status(200).json({ accessToken })
     }else{
        res.status(401)
        throw new Error("email or password is not valid")
     }
    //  res.json({ message: "login the user"});
});


//@desc current a users
//@route POOST /api/user/current
//@access private

const currentUser = asyncHandler(async (req,res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};
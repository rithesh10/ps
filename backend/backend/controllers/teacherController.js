const Teacher = require('../model/teacherModel')
const User = require('../model/userModel')
const Suggestion = require('../model/suggestionModel')
const asyncHandler = require('express-async-handler')
//login for a teacher with given username and password
const teacherlogin = asyncHandler( async (req,res)=>{
    const {username,password}=req.body;

    //Find teacher from the database.
    const teacher = await Teacher.findOne({username});

    //If teacher found
    if(teacher && password==teacher.password){
        res.status(200).json("Login succesfull");  
    }
    else{
        res.status(400).json("error");   
    }
})

const studentData = async (req,res)=>{
    const user = await User.find({})
    res.status(200).json(user)

}

const studentSuggestion = async(req,res)=>{
    const {name, id,suggestion}=req.body
    try{
        const userexist = await Suggestion.findOne({username:name});
        console.log("existing user",userexist)
        if(userexist)
        {
            await userexist.suggestion.push(suggestion);
            await userexist.save();
            res.status(200).json({message:"updated the latest suggestion"})
        }
        else{
            const create = await Suggestion.create({
                username:name,
                id:id,
                suggestion:[suggestion]
            })
            res.status(200).json({message:"suggestion created succesfully in backend"})
        }
    }
    catch(error)
    {
        res.status(400).json({message:error});
    }
}

const getSuggestion = async(req,res)=>{
    const suggestions = await Suggestion.find({})
    res.status(200).json(suggestions)
}

module.exports = {teacherlogin,studentData,studentSuggestion,getSuggestion}
const Result = require( "../model/resultModel");
const User = require('../model/userModel');
const asyncHandler=require('express-async-handler')
const { protect } = require('../middleware/authMiddleware');


const resultData = asyncHandler(async (req,res)=>{
  const finalPredictList = req.body.final_predict_list;
  const userdata=req.body.userdata;
  
  const Depression = finalPredictList[0][0];
  const Anxiety = finalPredictList[0][1];
  const Stress = finalPredictList[0][2];
  const name= userdata.name;
  const rollno = userdata.rollno;
  const user = userdata.id;

  try{

    const existingResult = await Result.findOne({ user});
    console.log("existing result=",existingResult);
    const currentDate = new Date();

    if(existingResult)
    {
      existingResult.options.push({Depression,Anxiety,Stress,currentDate})

      await existingResult.save();
      res.status(200).json({ message: "Result updated successfully" });
    }
    else{
      // const create = await Result.create({ one, two, three, name, rollno,user});
      const create = await Result.create({
        options: [{ Stress, Anxiety, Depression, }],
        user,
        name,
        rollno
      });
      res.status(200).json({ message: "Result created successfully", result: create });
    } 
  }
  catch(error)
  {
    res.status(400).json({message:error});
  }
  
})

const allResult = async (req,res)=>{
  const result = await Result.find({})
  res.status(200).json(result)

}

module.exports={resultData,allResult}
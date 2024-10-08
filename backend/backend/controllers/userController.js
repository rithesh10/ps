const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Result = require( "../model/resultModel");
const nodemailer = require('nodemailer')


const nameV = (name) => {
  return !(
    /\d/.test(name) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(name)
  );
};

const numV = (phoneno) => {
  return !(
    /[a-zA-Z]/.test(phoneno) ||
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(phoneno) ||
    phoneno.length !== 10
  );
};

const emailV = (email) => {
  return email.slice(-10) === "@gmail.com";
};

const userV = (rollno) => {
  return !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(rollno);
};

const passV = (password) => {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
  );
};
const registerUser = asyncHandler(async (req, res) => {
  const { name, section, password, rollno, phoneno, email } = req.body;

  if (!name || !section || !password || !rollno || !phoneno || !email) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ rollno });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Validation checks
  const isNameValid = nameV(name);
  const issecValid = true;
  const isPhoneValid = numV(phoneno);
  const isEmailValid = emailV(email);
  const isRollValid = userV(rollno);
  const isPassValid = passV(password);

  const errors = [];

  // Check each validation and collect errors
  if (!isNameValid) {
    errors.push("Invalid name");
  }
  if (!issecValid) {
    errors.push("Invalid section");
  }
  if (!isPhoneValid) {
    errors.push("Invalid phone number");
  }
  if (!isEmailValid) {
    errors.push("Invalid email");
  }
  if (!isRollValid) {
    errors.push("Invalid roll number");
  }
  if (!isPassValid) {
    errors.push("Invalid password");
  }

  // If any validation fails, send errors to the frontend
  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    // Check if all validations pass
    if (
      isNameValid &&
      issecValid &&
      isPhoneValid &&
      isEmailValid &&
      isRollValid &&
      isPassValid
    ) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      try {
        const user = await User.create({
          name,
          section,
          phoneno,
          rollno,
          email,
          password: hashedPassword,
        });

        res.status(201).json({
          _id: user.id,
          name: user.name,
          section: user.section,
          rollno: user.rollno,
          phoneno: user.phoneno,
          email: user.email,
          password: user.password,
          // token: generateToken(user._id)
        });
      } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
      }
    } else {
      throw new Error("Validations did not pass");
    }
  }
});

// for log in. it will go into api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { rollno, password } = req.body;

  //checking for user rollno
  const user = await User.findOne({ rollno });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      section: user.section,
      phoneno: user.phoneno,
      rollno: user.rollno,
      email: user.email,
      password: user.password,
      token: generateToken(
        user._id,
        user.name,
        user.section,
        user.phoneno,
        user.rollno,
        user.password,
        user.email
      ),
    });
    // res.cookie(token);
  } else {
    res.status(400);
    throw new Error("invalid credential");
  }
});
//This is private.
// api/users/me
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, section, rollno, phoneno, password, email } =
    await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    section,
    rollno,
    email,
    phoneno,
    password,
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { rollno, password, newpassword, confirmpassword } = req.body;
  const user = await User.findOne({ rollno });

  if (await bcrypt.compare(password, user.password)) {
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newpassword, salt);

    // Update the user's password with the newly hashed password
    if (passV(newpassword)) {
      user.password = hashedNewPassword;
      await user.save();

      // Generate a new token after changing the password
      const newToken = generateToken(
        user._id,
        user.name,
        user.section,
        user.phoneno,
        user.rollno,
        user.email,
        hashedNewPassword
      );

      res.status(200).json({
        message: "Password changed successfully",
        token: newToken,
      });
    } else {
      res.status(400).json({ error: "Invalid new password" });
    }
  } else {
    console.log("invalid current password");
    res.status(400).json({ error: "Invalid current password" });
  }
});

// profile-editing

const edit_profile = asyncHandler(async (req, res) => {
  const { name, section, rollno, phoneno, email } = req.body;
  const user=await User.findOne({rollno});
  const resultuser = await Result.findOne({rollno})

  if(!name || !section || !rollno || !phoneno || !email){
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Valaditation checks
  const isNameValid = nameV(name);
  const issecValid = true;
  const isPhoneValid = numV(phoneno);
  const isEmailValid = emailV(email);

  const errors=[];

  // Check each validaton and collect errors
  if (!isNameValid) {
    errors.push("Invalid name");
  }
  if (!issecValid) {
    errors.push("Invalid section");
  }
  if (!isPhoneValid) {
    errors.push("Invalid phone number");
  }
  if (!isEmailValid) {
    errors.push("Invalid email");
  }

  // If any validatoin fails, send errors to the frontend
  if(errors.length>0){
    res.status(400).json({errors});
  }else{
    // Check if all validations pass
    if(user){
      user.name=name;
      user.section=section;
      user.phoneno=phoneno;
      user.email=email;
      await user.save();

      resultuser.name=name;
      await resultuser.save();

      // Generate a new token after changing the password
      const newToken=generateToken(
        user._id,
        user.name,
        user.section,
        user.phoneno,
        user.rollno,
        user.email,
        user.password
      );

      res.status(200).json({
        message:"profile edited successfully",
        token:newToken,
      })
    }
  }
});

//Generating a token i.e JWT
const generateToken = (id, name, section, phoneno, email, rollno) => {
  return jwt.sign(
    { id, name, section, phoneno, email, rollno },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json("User not found. Email doesnot exist in database");
    }
    else{

      const token = generateToken(
        user._id,
        user.name,
        user.section,
        user.phoneno,
        user.rollno,
        user.password,
        user.email
        );
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'saimadhav9235@gmail.com',
            pass: 'ajqn wbcp zhwx didw'
          }
        });
        
        var mailOptions = {
          from: 'saimadhav9235@gmail.com',
          to: user.email,
          subject: 'Reset your password',
          text: `http://localhost:5173/reset-password/${user._id}/${token}`
        };
        res.status(200).json(mailOptions);
        
        // console.log("mailoptions",mailOptions);
        // console.log("transporter",transporter);
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log('Email sending error:', error);
            return res.status(500).json({ error: 'Failed to send email' });
          } else {
            // console.log('Email sent: ' + mailOptions.text);
            return res.status(200).json({ status: 'Success' });
          }
        });
      }
        
  } catch (error) {
    res.status(400).json(error);
  }
};

const resetpassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  if(passV(password)){

    try {
      if (token) {
        // Verify the token (You need to implement this part based on your token verification logic)
        const isTokenValid = verifyToken(token, id);
  
        if (isTokenValid) {
          const salt = await bcrypt.genSalt(10);
          const newPassword = await bcrypt.hash(password, salt);
  
          // Find the user by id and update the password
          const user = await User.findByIdAndUpdate(id, { password: newPassword });
  
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
  
          return res.status(200).json({ message: "Password reset successfully" });
        } else {
          return res.status(400).json({ message: "Token is not valid for the given user" });
        }
      } else {
        return res.status(400).json({ message: "Token is required for password reset" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  else{
    res.status(400).json({message:"Invalid password"})
  }
};

// Example token verification function (You need to implement your own logic)
const verifyToken = (token, id) => {
  try {
    // Verify the token using your secret key or other verification mechanism
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded user id matches the provided id
    return decoded.id === id;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const logout = asyncHandler(async(req,res)=>{
    
})



module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  changePassword,
  edit_profile,
  forgotpassword,
  resetpassword,
  logout,
};

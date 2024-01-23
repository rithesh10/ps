const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Result = require( "../model/resultModel");


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
    const token = generateToken(
      user._id,
      user.name,
      user.section,
      user.phoneno,
      user.rollno,
      user.password,
      user.email
    );
    res.status(200).json(token);
    const link = `http://localhost:2000/api/users/reset-password/${user._id}/${token}`;
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  changePassword,
  edit_profile,
  forgotpassword,
};

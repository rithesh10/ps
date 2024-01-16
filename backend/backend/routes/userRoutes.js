const express = require('express');
const router = express.Router()
const { registerUser,loginUser,getMe , getUsers,changePassword,forgotpassword}=require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware')
router.post('/student-signup',registerUser)
router.post('/student-login',loginUser)
router.get('/student-profile',protect,getMe)
router.get('/studentsData', getUsers);
router.post('/student-passwordChange',changePassword);
router.post('/forgot-password',forgotpassword);

module.exports = router
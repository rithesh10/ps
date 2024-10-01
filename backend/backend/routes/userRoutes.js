const express = require('express');
const router = express.Router()
const { registerUser,loginUser,getMe , getUsers,changePassword,edit_profile,forgotpassword,resetpassword,logout}=require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware')
router.post('/student-signup',registerUser)
router.post('/student-login',loginUser)
router.get('/student-profile',protect,getMe)
router.get('/studentsData', getUsers);
router.post('/student-passwordChange',changePassword);
router.post('/student-edit-profile',edit_profile);
router.post('/forgot-password',forgotpassword);
router.post('/reset-forgotten-password/:id/:token',resetpassword)
router.post('/student-logout',protect,logout)

module.exports = router
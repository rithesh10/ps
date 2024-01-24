const express = require('express')
const router = express.Router()
const {teacherlogin,studentData,studentSuggestion,getSuggestion} = require('../controllers/teacherController');
router.post('/teacher-login',teacherlogin);
router.get('/student-data',studentData);
router.post('/student-suggestion',studentSuggestion);
router.get('/get-suggestion',getSuggestion);

module.exports = router
const router = require('express').Router();
const { register, login, myProfile } = require('../controllers/authControllers');

  //  base path = "/api/auth"
  
  router.post('/register', register)
  router.post('/login', login)
  router.get('/profile', myProfile)

module.exports = router;
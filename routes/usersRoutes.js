const router = require('express').Router();
const { getAllUsers, getUserById, createNewUser, deleteUser, updateUser } = require('../controllers/usersControllers');
const { mustLogin, allowedRoles } = require('../controllers/authControllers');

  //  base path = "/api/users"
  
  router.get('/', getAllUsers)
  router.get('/:id', getUserById)
  router.post('/', createNewUser)
  router.delete('/:id', deleteUser)
  router.patch('/:id', updateUser)

module.exports = router;
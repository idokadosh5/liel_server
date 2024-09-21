const router = require('express').Router();
const { getAllMeals, getMealById, searchInMeals, createNewMeal, deleteMeal, updateMeal } = require('../controllers/mealsControllers');
const { Router } = require('express');
  //  base path = "/api/meals"

  router.get('/', getAllMeals)
  
  // unprotected Routes :
  router.get('/:id', getMealById)
  router.post('/search', searchInMeals)
  router.post('/' ,createNewMeal)
  router.delete('/:id', deleteMeal)
  router.patch('/:id', updateMeal)

module.exports = router;
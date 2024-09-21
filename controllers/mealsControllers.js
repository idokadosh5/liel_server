const schemas = require("../schemas/MealsSchema");
const Meal = require("../models/Meals");

const getAllMeals = async (req, res) => {
  
  try {
    const allMeals = await Meal.find({});
    return res.status(200).json(allMeals);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getMealById = async (req, res) => {
  const { id } = req.params;

  try {
    
    const found = await Meal.findById(id).exec();
    
    if (found) {
      return res.status(200).json(found);
    }
    return res.status(404).json({
      success: false,
      message: `Meal id '${id}' not found`,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const searchInMeals = async (req, res) => {

  const { error, value } = schemas.searchMeal.validate(req.body);

  if (error) {
    const errorsArray = error.details.map((err) => err.message); 
    return res.status(400).json({ success: false, message: errorsArray });
  }
  
  const { searchTerm, searchFields } = value;

  try {
    
    const found = await Meal.multipleFieldsStringSearch(searchTerm,searchFields);
    
    return res.status(found.length !== 0 ? 200 : 204).json(found);
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const createNewMeal = async (req, res) => {

  const { error, value } = schemas.createNewMeal.validate(req.body);
  if (error) {
    const errorsArray = error.details.map((err) => err.message); 
    return res.status(400).json({ success: false, message: errorsArray });
  }
  const newMeal = new Meal(value);

  try {
    const saved = await newMeal.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: err.message });
  }
};

const deleteMeal = async (req, res) => {

  const { id } = req.params;

  try {
    const deleted = await Meal.findByIdAndDelete(id);
    if (!deleted) throw new Error();
    return res.status(200).json(deleted);
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: err.message });
  }
};

const updateMeal = async (req, res) => {
  
  const { error, value } = schemas.updateMeal.validate(req.body);

  if (error) {
    const errorsArray = error.details.map((err) => err.message); 
    return res.status(400).json({ success: false, message: errorsArray });
  }
  
  const { id } = req.params;

  let updated;

  try {
    updated = await Meal.findByIdAndUpdate(id, value, { new: true });
    
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: err.message });
    
    return res.status(200).json(updated);
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllMeals,
  getMealById,
  searchInMeals,
  createNewMeal,
  deleteMeal,
  updateMeal,
};

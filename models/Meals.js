const mongoose = require("mongoose");
const { imageSchema } = require("./common");
const { ref } = require("joi");


const mealsSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    description: String,
    price: String,
    image: imageSchema,
  },
  {
    timestamps: true,
  }
);

//search inside meals:
  /**
   * @param {string} searchTerm - Your search term (case insensitive)   : 'your search term'
   * @param {Array.<String>} searchFields - The fields to search inside : ['title','email',...]
   */

  mealsSchema.statics.multipleFieldsStringSearch = function(searchTerm,searchFields) {
    const query = {
        $or:
        [
            ...searchFields.map(field => ({
                [field]: new RegExp(searchTerm, 'i')
            }))
        ]
    };
    return this.find(query);
  };

// -------------------------------------------------------------------------------------/


const Meal = mongoose.model("Meal", mealsSchema);

module.exports = Meal;

/*
============================================
============================================
            **** WARNING ****
  RUNNING THIS SCRIPT WILL DELETE AND\OR
  OVERWRITE YOUR Bmeals DATABASE !!!!!!!
============================================
============================================
*/
//change mongoose models
const connectDB = require('./config/db')
const { meals, users } = require('./data/data')
const Meal = require('./models/Meal')
const User = require('./models/User')

const seedAll = async() => {

  console.log('\nDatabase seeding started...');

  try {
    
    // Seed meals

      // delete all existing meals
      await Meal.deleteMany();
      // insert seed meals
      const insertedmeals = await Meal.insertMany(meals);
      console.log(`  [i] Inserted ${insertedmeals.length} meals`);

    // Seed users

      // delete all existing users
      await User.deleteMany();
      // insert seed users
      const insertedUsers = await User.insertMany(users);
      console.log(`  [i] Inserted ${insertedUsers.length} users`);

    // Success

      console.log('[v] Completed successfully');
      process.exit(0);

  } catch(e) {

    // Error

      console.log('[x] Seeding error')
      console.log(e.message)
      process.exit(1);

  }

}

// Connect to database
connectDB().then(()=>{
  // Seed all collections
  seedAll()
});
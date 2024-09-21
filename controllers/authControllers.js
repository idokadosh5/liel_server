const schemas = require("../schemas/usersSchema");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const register = async (req, res) => {

  // validate the request's body using joi
  const { error, value } = schemas.createNewUser.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); 
    return res.status(400).json({ success: false, message: errorsArray });
  }

  try {
    // check if the email is already in use (in db)
    const existingUser = await User.find({ email: value.email });

    if (existingUser.length > 0)
      return res
        .status(409)
        .json({
          message: `Email ${value.email} is already in use! consider logging in`,
        });
    // create new user in memory
    const newUser = new User(value);
    // hash the password
    const hashedPassword = await bcrypt.hash(value.password, 10);
    // replace the plain-text password we received from the user, by its hashed version
    newUser.password = hashedPassword;
    newUser.isAdmin = false;
    const saved = await newUser.save();

    const token = jwt.sign(
      {
        id: saved.id,
        isAdmin: saved.isAdmin,
      },
      JWT_SECRET,
      {
        expiresIn: '4h',
      }
    );

    return res
      .status(201)
      .json( token );
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: `Error registering user: ${err.message}`,
      });
  }
};

const login = async (req, res) => {
  
  const { error, value } = schemas.login.validate(req.body);
  
  if (error) {
    return res.status(400).json(error.message);
  }


  try {
    const user = await User.findOne({ email: value.email });
    if (!user)
      return res
        .status(403)
        .json({ sucees: false, message: "incorrect email or password" });
    
    const isMatch = await bcrypt.compare(value.password, user.password);
    
    if (!isMatch)
      return res
        .status(403)
        .json(err.message);

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      {
        expiresIn: '4h',
      }
    );
    
    return res.status(200).json(token );
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Error loggin-in: ${err.message}` });
  }
};

const myProfile = (req, res) => {

};

// ------------

const mustLogin = (req,res,next) => {
  const token = req.header('x-auth-token')
  if (!token) return res.status(403).json({ sucees: false, message: 'Forbidden: you must be logged-in to view this content' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload;
    return next();
  } catch(err) {
    return res.status(403).json({ sucees: false, message: 'Forbidden: you must be logged-in to view this content' })
  }
}

const allowedRoles = (allowedRoles) => {
  return (req,res,next) => {
    if (!Array.isArray(allowedRoles)) throw new Error('Error: allowedRoles must be an array');
    if (allowedRoles.length===0) throw new Error('Error: allowedRoles must contain at-least one element');
    if (!req.user) return res.status(403).json({ sucees: false, message: 'Forbidden: you must be logged-in to view this content' })
    
    const { isAdmin } = req.user;
    
    let hasRole = false;

    if (allowedRoles.includes('admin') && isAdmin) hasRole=true;

    if (!hasRole) {
      const allowedRolesString = allowedRoles.join('/')
      return res.status(401).json({ success: false, message: `Unauthorized: only ${allowedRolesString} users can access this resource` })
    }

    return next();
  }
}

module.exports = {
  register,
  login,
  myProfile,
  mustLogin,
  allowedRoles,
};

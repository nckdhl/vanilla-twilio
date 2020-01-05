const db = require("./db/connect");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cfg = require('./../config');

exports.loginHandler = async function loginHandler(req) {
  const queryText = "SELECT password, id FROM users where email = $1";
  const values = [req.body.email];

  let response = {
    status: 400, 
    message: "",
    error: undefined,
    token: undefined
  };

  const client = await db.connect();
  try {
    const result = await client.query(queryText, values)
    console.log("Results: ", result.rows[0]);
    if (result.rowCount === 1){
      const storedPass = result.rows[0].password;
      const validPass = await bcrypt.compare(req.body.password, storedPass);
      if (validPass){
        console.log("Valid password - user logged in");
        response.status = 200;
        response.message = "Valid password. Logged in.";
        response.token = jwt.sign({ _id: result.rows[0].id }, cfg.JWTSecret);
      } else {
        console.log("Invalid password");
        response.status = 400;
        response.error = "Invalid username or password";
      }
    } else {
      console.log("No user found");
      response.status = 400;
      response.error = "Invalid username or password";
    }
  } catch(err) {
    console.log('Error with checkUser() query: ', err.stack);
    response.status = 500;
    response.error = "Internal server error";
  } finally {
    client.release()
  }
  return response;
};

exports.registerHandler = async function registerHandler(req) {
  // parameters
  const values = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: await hashPassword(req.body.password)
  };

  let response = {
    status: 400, 
    message: "",
    error: undefined
  };

  let userExists = await checkUser(values.email);
  console.log("Does user exist: ", userExists);

  if (!userExists) {
    console.log("Tried to insert:")
    let userInserted = await insertUser(values);
    if (userInserted){
      response.status = 200;
      response.message = "Success. You've been registered";
    } else {
      response.status = 400;
      response.error = "Internal error. Please try again";
    }
    
  } else {
    response.status = 400;
    response.error = "There's already a user with that email";
  }

  return response;
};

async function hashPassword(unhashedPwd){
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(unhashedPwd, salt);
  return hashedPwd; 
}

// Checks if user already exists in database
async function checkUser(email) {

  const queryText = "SELECT * FROM users WHERE email = $1";
  const params = [email];
  let alreadyExists = true;

  
  const client = await db.connect()
  try {
    const result = await client.query(queryText, params)
    result.rowCount > 0 ? alreadyExists = true : alreadyExists = false;
    console.log('alreadyExists: ', alreadyExists);
    console.log('This many rows were affected: ' + result.rowCount);
  } catch(err) {
    console.log('Error with checkUser() query: ', err.stack);
  } finally {
    client.release()
  }

  return alreadyExists;
}

async function insertUser(values) {

  const queryText =
    "INSERT INTO users (first_name,last_name,email,password) VALUES ($1, $2, $3, $4)";
  const params = [values.firstName, values.lastName, values.email, values.password];
  let success = false;

  const client = await db.connect()
  try {
    const result = await client.query(queryText, params)
    result.rowCount > 0 ? success = true : success = false;
    console.log('success: ', success);
    console.log('This many rows were affected: ' + result.rowCount);
  } catch(err) {
    console.log('Error with insertUser() query: ', err.stack);
  } finally {
    client.release()
  }

  return success;
}


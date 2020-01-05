const Router = require("express").Router;

const { loginHandler, registerHandler } = require("./loginHandler");
const { registerValidation, loginValidation } = require("./../lib/validation");

const router = new Router();

// registration route
router.post("/register", async (req, res) => {
  res.set("Content-Type", "application/json");
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const response = await registerHandler(req);
    res.status(response.status).send(JSON.stringify(response));
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// login route
router.post("/login", async (req, res) => {
  res.set("Content-Type", "application/json");
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const response = await loginHandler(req);
    if (response.token){
        res.header('auth-token', response.token)
    }
    res.status(response.status).send(JSON.stringify(response));
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;

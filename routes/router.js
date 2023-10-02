const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userController");

//Routes are defined here
router.post("/user/register", controllers.userPost);
router.get("/user/getAllUsers", controllers.getAllUsers);
router.get("/user/getUser/:id", controllers.getUser);
router.delete("/user/deleteUser/:id", controllers.deleteUser);
router.put("/user/updateUser/:id", controllers.updateUser);

module.exports = router;

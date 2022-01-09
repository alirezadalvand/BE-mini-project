const router = require("express").Router();
const services = require("../services/render");
const controller = require("../contoroller/controller");
//* main  /
// * method GET /
router.get("/", services.homeRoutes);

//* add user  /
// * method GET /
router.get("/add-user", services.add_user);

//* update user  /
// * method GET /
router.get("/update-user", services.update_user);

//* API

router.post("/api/users", controller.create);
router.get("/api/users", controller.find);
router.put("/api/users/:id", controller.update);
router.delete("/api/users/:id", controller.delete);

module.exports = router;

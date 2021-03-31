var express = require("express");
var router = express.Router();
var {
    signUp
} = require("./controller/userController");
var {
    checkIfEmptyMiddleware,
    checkForSymbolMiddleware,
} = require("../lib/validator");


/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post(
    "/sign-up",
    checkIfEmptyMiddleware,
    checkForSymbolMiddleware,
    signUp
);

module.exports = router;
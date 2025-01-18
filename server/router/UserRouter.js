const express = require("express");
const router = express.Router();
const {
    register,
    sign_in_email,
    decode,
    get_datas,
    get_data,
    search_data,
    update_data,
    recover_password
} = require("../controller/UserController");



// @method: POST
router.post("/api/user/create", register)
router.post("/api/user/sign-in-email", sign_in_email)

// @method: GET
router.get("/api/user/decode", decode)
router.get("/api/user/all", get_datas)
router.get("/api/user/search", search_data)
router.get("/api/user/:id", get_data)

// @method: PUT
router.put("/api/user/:id", update_data)
router.put("/api/user/recover-password/:id", recover_password)





module.exports = router;

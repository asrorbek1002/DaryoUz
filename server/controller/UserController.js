const UserModel = require("../model/UserModel");
const ToDoClass = require("../utils/class")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { jwtKeyword, jwtTime } = require("../utils/constant")

module.exports = {
    register: async (req, res, next) => {
        const result = new ToDoClass(UserModel, req, res, next);
        result.createData()
    },
    sign_in_email: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || email == "" || password == "" || !password) {
                throw new Error("Fill form")
            }
            else {
                const isUser = await UserModel.findOne({ email: email }).select("password");
                if (!isUser || isUser == null) {
                    throw new Error("User not found")
                }
                else {
                    const isPassword = await bcrypt.compare(password, isUser.password);
                    if (isPassword == false) {
                        throw new Error("Password invalid")
                    }
                    else {
                        const token = jwt.sign({ id: isUser._id }, jwtKeyword, { expiresIn: jwtTime });
                        res.json({ status: true, data: token })
                    }
                }
            }
        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
    sign_in_phone: async (req, res, next) => {
        try {

        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
    decode: async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            const data = jwt.verify(authorization, jwtKeyword)
            res.json({ status: true, data })
        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
    get_datas: async (req, res, next) => {
        const result = new ToDoClass(UserModel, req, res, next);
        result.findAll()
    },
    get_data: async (req, res, next) => {
        const result = new ToDoClass(UserModel, req, res, next);
        result.findById()
    },
    search_data: async (req, res, next) => {
        try {
            const dts = [];
            const { name, role, status, order } = req.query;

            if (name !== "all") dts.push({ $match: { name: { $regex: name, $options: "i" } } });
            if (role !== "all") dts.push({ $match: { role: { $eq: role } } });
            if (status !== "all") dts.push({ $match: { status: { $eq: status } } });
            if (order !== "all") dts.push({ $match: { order: { $eq: parseInt(order) } } })

            dts.push({ $sort: { createdAt: -1 } })

            const result = await UserModel.aggregate(dts)
            res.json({ status: true, data: result })
        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
    update_data: async (req, res, next) => {
        try {
            const { password } = req.body;
            if (password != "" || password) {
                throw new Error("Password not supported")
            }
            else {
                const result = new ToDoClass(UserModel, req, res, next);
                result.updateById()
            }
        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
    recover_password: async (req, res, next) => {
        try {
            const { id } = req.params
            const { oldPassword, newPassword, confirmPassword } = req.body;
            if (!oldPassword || !newPassword || !confirmPassword) {
                throw new Error("Enter the passwords")
            }
            else {
                const isUser = await UserModel.findByIdAndUpdate({ _id: id }).select("password");
                if (!isUser || isUser == null) {
                    throw new Error("User not found")
                }
                else {
                    const isPassword = await bcrypt.compare(oldPassword, isUser.password);
                    if (isPassword == false) {
                        throw new Error("Old password invalid")
                    }
                    else {
                        if (newPassword == confirmPassword) {
                            isUser.password = newPassword;
                            await isUser.save();
                            res.json({ status: true, data: isUser })
                        }
                        else {
                            throw new Error("Password not similar")
                        }
                    }
                }
            }

        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
}
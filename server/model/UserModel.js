const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
    name: {
        type: String, required: [true, "Enter your name"]
    },
    phone: {
        type: String, required: [true, "Enter your phone"], unique: true // 998901299881
    },
    email: {
        type: String, required: [true, "Enter your email address"], unique: true
    },
    order: {
        type: Number, required: [true, "Enter your order"], unique: true
    },
    password: {
        type: String, required: [true, "Enter your password"]
    },
    balance: {
        type: Number, default: 0
    },
    role: {
        type: String, required: [true, "Enter your role"], enum: ["admin", "user"]
    },
    tarif: {
        type: String, enum: ["none", "vip"], default: "none"
    },
    deadline: {
        type: String, default: "none" //  new Date().toISOString()
    },
    status: {
        type: Boolean,
        enum: [
            true,   // faol
            false,  // muzlatilgan
        ],
        default: true
    },
}, {
    timestamps: true
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("user", UserSchema)



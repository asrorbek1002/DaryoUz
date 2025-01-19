const UserCreateTable = require("../model/UserModel");
const CategoryTable = require("../model/CategoryModel");

const create_table = async () => {
    await UserCreateTable();
    await CategoryTable();
}

module.exports = create_table;
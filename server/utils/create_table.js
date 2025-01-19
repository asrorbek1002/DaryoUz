const UserCreateTable = require("../model/UserModel");
const CategoryTable = require("../model/CategoryModel");
const SubcategoryTable = require("../model/SubcategoryModel");

const create_table = async () => {
    await UserCreateTable();
    await CategoryTable();
    await SubcategoryTable();
}

module.exports = create_table;
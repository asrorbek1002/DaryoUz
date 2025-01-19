const UserCreateTable = require("../model/UserModel");

const create_table = async () => {
    await UserCreateTable();
}

module.exports = create_table;
const UserCreateTable = require("../model/UserModel");
const CategoryTable = require("../model/CategoryModel");
const SubcategoryTable = require("../model/SubcategoryModel");
const NewsTable = require("../model/NewsModel");
const CommentTable = require("../model/CommentModel");
const ReplyCommentTable = require("../model/ReplyCommentModel");
const ApplyTable = require("../model/ApplyModel");
const ConfirmTable = require("../model/ConfirmModel");
const RatingTable = require("../model/RatingModel");


const create_table = async () => {
    await UserCreateTable();
    await CategoryTable();
    await SubcategoryTable();
    await NewsTable();
    await CommentTable();
    await ReplyCommentTable();
    await ApplyTable();
    await RatingTable();
    await ConfirmTable();
}

module.exports = create_table;
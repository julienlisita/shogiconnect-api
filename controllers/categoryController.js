const { Category } = require("../db/sequelizeSetup");
const { errorHandler } = require("../errorHandler/errorHandler");

const findAllCategories = async (req, res) => {
    try {
        const result = await Category.findAll()
        return res.json({ data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = { findAllCategories };
const { User } = require("../db/sequelizeSetup")
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllUsers = async (req, res) => {
    try {
        const result = await User.findAll()
        return res.json({ data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = { findAllUsers }
const { User } = require("../db/sequelizeSetup")

const findAllUsers = async (req, res) => {
    try {
        const result = await User.findAll()
        return res.json({ data: result })
    } catch (error) {
        const message = "la liste des utilisateurs n'a pas pu être récupérée. Reéssayer dans quelques instants."
        return res.status(500).json({message, data: error});
    }
}

module.exports = { findAllUsers }
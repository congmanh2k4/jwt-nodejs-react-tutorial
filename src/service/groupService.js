import db from "../models/index";
const getGroup = async() => {
    try {
        let data = await db.Group.findAll({
            attributes: ["id", "name", "description"],
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['name', 'ASC']],
        });
        return {
            EM: "get group successful",
            EC: 0,
            DT: data,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong",
            EC: 1,
            DT: [],
        };
    }
}

module.exports = {
    getGroup
}
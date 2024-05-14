export const getAllUsers = async (req, res, next) => {
    try {
        const users = await order.find();
        return res.status(200).send("All users").json(users);
    } catch (error) {
        return res.status(500).send("internal error");
    }
}


export const getUsersById = async (req, res, next) => {
    try {
        
    } catch (error) {
        return res.status(500).send("internal error");        
    }
}

const User = require("../model/user");
const deleteUserController = async (req, res) => {
    try {
        
        const useId = req.body._id;
        console.log("useId", useId);
        if (!useId) {
            return res.status(400).json({ message: "Id is required" });
        }

        const deletedByEmail = await User.deleteOne({ _id: useId });

        if (!deletedByEmail) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { deleteUserController };
import User from "../model/userModel.js";

const handleGetAllUsers = async (req, res) => {
    let { limit, page } = req.query
    limit = limit ? limit : 10;
    page = page ? page : (page - 1)
    try {
        const users = await User.find({ role: "User" })
            .limit(limit).skip(limit * (page - 1))
        const totalCount = await User.countDocuments({ role: "User" })
        res.json({ users, total: totalCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleDeleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: error.message });
    }
};



const handleUpdateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
            new: true,
            // runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleGetUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            addresses: user.addresses.length > 0 ? user.addresses : [],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export {

    handleGetAllUsers,
    handleDeleteUser,
    handleUpdateUser,
    handleGetUserDetails
};

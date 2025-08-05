import User from "../models/userModel.js";

export const addUser = async (req, res) => {
    const { name, email, gender}= req.body;

    await User.create({name, email, gender});
    res.status(201).json({ message: "User added successfully" });
};

export const addItem= async (req, res) => {
    const { stockName } = req.body;
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.stockName.push(stockName);
        await user.save();
        res.status(200).json({ message: "Item added successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error adding item", error: error.message });
    }
}

export const deleteItem = async (req, res) => {
    console.log("deleteItem called");
    const userId = req.params.id;
    const { stockName } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.stockName = user.stockName.filter(item => item !== stockName);
        await user.save();
        res.status(200).json({ message: "Item deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error: error.message });
    }
}

export const getUserStock = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ stockName: user.stockName });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user stock", error: error.message });
    }
}
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const SECRET_KEY = "NOTESAPI";

const createToken = (user) => {
    return jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
    const { id, name, email, password, addresses, role, phone } = req.body;
    try {
        if(role != "Admin" && role != "User"){
            return res.json({
                success:false,
                message:'Role can only be User or Admin'
            })
        }
        const emailExist = await userModel.findOne({ email });
        if (emailExist) {
            return res.json({ success: false, message: "Email Already Exists" });
        }
        let hashedPassword;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const newUser = new userModel({
            id: id,
            name: name,
            email: email,
            password: hashedPassword,
            addresses: addresses,
            role: role,
            phone: phone,
        });

        const user = await newUser.save();
        const token = createToken(user);
        return res.json({ success: true, token });
    } catch (error) {
        console.log("Error");
        return res.json({ success: false, message: error });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User dont Exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Crediantials" });
        }
        const token = createToken(user);
        return res.json({ success: true, token, role: user.role });
    } catch (error) {
        return res.json({ success: false, message: error });
    }
};

export { registerUser, loginUser };

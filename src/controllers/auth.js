import model from "../database/models";
import * as bcrypt from 'bcrypt'

export const loginUser = async(req,res) => {
        const user = await model.User.findOne({
            where: {email: req.body.email}
        });
        if (!user) return res.status(400).json({ message: "Email or Password Incorrect"});
        //if (req.body.password != user.password) return res.status(400).json({ message: "Email or Password Incorrect"});
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).json({ message: "Email or Password Incorrect"});
        res.status(200).json({ message: "User Logged Successfully"});
}
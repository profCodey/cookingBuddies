import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/emailServices.js";
import ejs from "ejs";
import path, { fileURLToPath, URL } from "url";
import {dirname} from "path"

export const registerUser = async (req, res) => {
  try {
    const { email, userName, firstName, lastName, password, photo } = req.body;

    //Check if the user already exist in the database
    const existingUser = await UserModel.findOne().or([
      { email },
      { userName },
    ]);

    //If user exist, return an error response back
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        status: "failed",
        data: null,
      });
    }

    const user = new UserModel({
      firstName,
      lastName,
      userName,
      email,
      password,
      photo,
    });

    //Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt)
   
    const emailToken = jwt.sign(
      {
        user_email: user.email,
        user_id: user._id,
      },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1hr",
      }
    );

    user.emailToken = emailToken;
    
    const link = `${process.env.FRONT_END_URL}/verify-account/${emailToken}`;
    
    const __filename = fileURLToPath(new URL(import.meta.url));
    const __dirname = dirname(__filename);

    const emailTemplatePath = path.resolve(__dirname, "../../src/utils/emailTemplates/verifyUser.ejs");

    const emailTemplate = ejs.renderFile(emailTemplatePath, {firstName: user.firstName, link})

    const mailSubject = "Welcome on Board";

    try {
      await sendEmail(user.email, mailSubject,emailTemplate )
    } catch (error) {
      console.error("Error sending email", error)
    }

    await user.save();

        return res.status(201).json({
            message: "User created successfully",
            status: "success",
            data: user,
            email: user.emailToken
        })
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `An error occurred while creating user. Please try again.`,
      error: error.message,
      status: "failed",
      data: null,
    });
  }
};

import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/emailServices.js";
import ejs from "ejs";


export const registerUser = async (req, res) => {
  try {
    const { email, userName, firstName, lastName, password, photo } = req.body;

    // Check if the user already exist in the database
    const existingUser = await UserModel.findOne().or([
      { email },
      { userName },
    ]);

    // If user exist, return an error response back
    if (existingUser) {
      return res.status(400).json({
        message: "Email or username already exists",
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
    user.password = await bcrypt.hash(user.password, salt);

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

    const link = `${process.env.BASEURL}/api/auth/verify-account/${emailToken}`;


    console.log("hereeeee", process.cwd());
try {
  const emailTemplate = await ejs.renderFile("src/controller/verifyUser.ejs", {
    firstName: user.firstName,
    link,
  });

  const mailSubject = "Welcome on Board";

  await sendEmail(user.email, mailSubject, emailTemplate);
} catch (error) {
  console.error("Error sending email", error);
}
    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      status: "success",
      data: user,
      email: user.emailToken,
    });
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

export const verifyUser = async(req, res)=> {
try{
  const {emailToken} = req.params;
  const decodedToken = jwt.verify(emailToken, process.env.EMAIL_SECRET);

  if (!decodedToken) {
    return res.status(400).json({
      message: "Invalid token",
      status: "failed",
      data: null,
    });
  }

  const user = await UserModel.findById(decodedToken.user_id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      status: "failed",
      data: null,
    });
  }

  if (user.isVerified) {
    return res.status(400).json({
      message: "User is already verified. Kindly login to access your account",
      status: "failed",
      data: null,
    })
  }

  user.isVerified = true;
  user.emailToken = null;
  await user.save();

  return res.json({data: decodedToken})

} catch (error) {
  console.log(error);
  return res.status(500).json({
    message: `An error occurred while verifying user. Please try again.`,
    error: error.message,
    status: "failed",
    data: null,
  });
}
}

export async function loginUser(req, res){
  try {
    //Check if the email exist
    const user = await UserModel.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });

    //If user doesnt exist, return an error response back
    if (!user) {
      return res.status(404).json({
        message: "Wrong email or password combination", 
        status: "failed",
        data: null,
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your account to login",
        status: "failed",
        data: null,
      });
    }

    //Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Wrong email or password combination",
        status: "failed",
        data: null,
      }); 
    }

    const token = await user.generateAuthToken();
    
    return res.status(200).json({
      message: "You have succesfull logged in",
      status: "success",
      token,
      data: {
          id: user._id,
          email: user.email,
          userName: user.userName,
          firstName: user.firstName,
      }
    });

  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Unable to login user. Please try again.`,
      error: err.message,
      status: "failed",
      data: null,
    });
    }
  
}
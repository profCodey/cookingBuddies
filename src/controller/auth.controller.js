import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    console.log("req.body", req.body);

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

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt)
      
      console.log('this is user', user)

    //     .save((err, data) => {
    //     if (err) {
    //         return res.status(500).json({
    //             message: `An error occurred while creating user. Please try again.`,
    //             error: err,
    //             status: "failed",
    //             data: null
    //         })
    //     }
    //     return res.status(201).json({
    //         message: "User created successfully",
    //         status: "success",
    //         data: data
    //     })
    // });

    let name = "ozed";

    // return res.status(201).json(
    //     {
    //         message: "User created successfully",
    //         status: "success",
    //         data: req.body

    //     }
    // )
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

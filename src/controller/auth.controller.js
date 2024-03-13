import UserModel from "../model/user.model.js"

export const registerUser = async (req, res) => {
    try {

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

        






     
        
        let name = "ozed";
     
        
        // return res.status(201).json(
        //     {
        //         message: "User created successfully",
        //         status: "success",
        //         data: req.body

        //     }
        // )
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: `An error occurred while creating user. Please try again.`,
            error: error,
            status: "failed",
            data: null
        })
  }
}
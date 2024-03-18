import User from "../model/user.controller.js";


// Controller function to get all users
const getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
    return res.status(200).json({
      message: "Fetched all users",
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
      data: null,
    });
  }
};

// Controller function to get a single user by ID
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return return res.status(404).json({
        message: "User not found",
        status: "failed",
        data: null,
      });
    }
    return res.status(200).json({
      message: "Fetched single user",
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
      data: null,
    });
  }
};

// Controller function to update a single user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return return res.status(404).json({
        message: "User not found",
        status: "failed",
        data: null,
      });
    }
    Object.assign(user, req.body);
    const updatedUser = await user.save();
    return res.status(200).json({
      message: "User updated successfully",
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
      data: null,
    });
  }
};

// Controller function to delete a single user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "failed",
        data: null,
      });
    }
    await user.remove();
    return res.json({
      message: "User deleted successfully",
      status: "success",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
      data: null,
    });
  }
};

export { createUser, getAllUsers, getSingleUser, updateUser, deleteUser };

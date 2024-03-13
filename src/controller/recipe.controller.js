export const getAllRecipes = (req, res) => {
  try {
    return res.status(200).json({
      message: "You have succesfully fethed all the electornics",
      data: [
        {
          name: "iPhone",
          price: 2500000,
        },
        {
          name: "Samsung",
          price: 2500000,
        },
      ],
      status: "success",
    });
  } catch (error) {
     return res.status(500).json({
          message: "An error occured while fetching the data",
          status: "failed",
          data: null
      })
  }
};

import RecipeModel from "../model/recipe.model.js";

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    return res.status(200).json({
      message: "Fetched all recipes",
      status: "success",
      data: recipes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occured while fetching the data",
      status: "failed",
      data: null,
    });
  }
};

export const getSingleRecipe = async (req, res) => {
  try {
    const recipes = await RecipeModel.findById(req.body._id);
    if (!recipes) {
      return res.status(404).json({
        message: "Recipe not found",
        status: "failed",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Fetched single recipe",
      status: "success",
      data: recipes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occured while fetching the data",
      status: "failed",
      data: null,
    });
  }
};

export const updateSingleRecipe = async (req, res) => {
  try {
    const recipes = await RecipeModel.findById(req.body._id);

    if (!recipes) {
      return res.status(404).json({
        message: "Recipe not found",
        status: "failed",
        data: null,
      });
    }

    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      req.body._id,
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Fetched single recipe",
      status: "success",
      data: updatedRecipe,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occured while fetching the data",
      status: "failed",
      data: null,
    });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      cuisine,
      difficulty,
      tags,
      createdBy,
    } = req.body;

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      cuisine,
      difficulty,
      tags,
      createdBy,
    });

    const newRecipe = await recipe.save();
    return res.status(201).json({
      message: "You have succesfull created a new recipe",
      status: "success",
      data: newRecipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await RecipeModel.findById(id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
        status: "failed",
        data: null,
      });
    }

    await recipe.remove();
    res.json({
      message: "Recipe deleted successfully",
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

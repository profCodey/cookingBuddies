import express from "express";
const router = express.Router();

import {
  getAllRecipes,
  getSingleRecipe,
  createRecipe,
  deleteRecipe,
  updateSingleRecipe,
} from "../controller/recipe.controller.js";

router.get("/all-recipes", getAllRecipes);
router.post("/recipe", createRecipe);
router.get("/recipe/:id/", getSingleRecipe);
router.patch("/recipe/:id/", updateSingleRecipe);
router.delete("/recipe/:id/", deleteRecipe);

export default router;

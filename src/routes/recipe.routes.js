import express from 'express';
const router = express.Router();

import { getAllRecipes } from "../controller/recipe.controller.js";

router.get("/all-recipes", getAllRecipes);

export default router;






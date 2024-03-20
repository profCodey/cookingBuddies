import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the Ingredient schema
const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String
  }
});

// Define the Recipe schema
const recipeSchema = new Schema(
    [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            ingredients: [ingredientSchema], // Array of ingredients
            instructions: {
                type: String,
                required: true
            },
            prepTime: {
                type: Number,
                required: true
            },
            cookTime: {
                type: Number,
                required: true
            },
            servings: {
                type: Number,
                required: true
            },
            cuisine: {
                type: String
            },
            difficulty: {
                type: String,
                enum: ['Easy', 'Medium', 'Hard'],
                default: 'Medium'
            },
            tags: [{
                type: String
            }],
            createdBy: {
                type: Schema.Types.ObjectId,
                ref: 'User', // Reference to the User who created the recipe
                required: true
            },
        },
        {

        }
    ]);

    export default mongoose.model("Recipe", recipeSchema);


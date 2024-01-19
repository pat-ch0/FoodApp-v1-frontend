import Composition from "./composition";
import Ingredient from "./ingredient";
import Product from "./product";

export default class ProductBuilder {
    static fromJson(json: any): Product {
        const composition = new Composition();
        composition.vegetarian = json.composition.vegetarian;
        composition.vegan = json.composition.vegan;
        composition.ingredients = json.composition.ingredients.map((ingredientJson: any) => {
            const ingredient = new Ingredient();
            ingredient.id = ingredientJson.id;
            ingredient.percent = isNaN(ingredientJson.percent) ? 0 : ingredientJson.percent;
            ingredient.percentEstimate = ingredientJson.percentEstimate;
            ingredient.percentMax = ingredientJson.percentMax;
            ingredient.percentMin = ingredientJson.percentMin;
            ingredient.text = ingredientJson.text;
            ingredient.vegan = ingredientJson.vegan;
            ingredient.vegetarian = ingredientJson.vegetarian;
            return ingredient;
        });
        
        return new Product(
            json.price,
            json.name,
            composition,
            json.nutriScore,
            json.imageSrc,
            json.carbonFootprint,
            json.allergens,
            json.dietaryRestrictions
        );
    }
}

import Composition from "./composition";
import Ingredient from "./ingredient";
import Product from "./product";
import ProductDetail from "./product-detail";

export default class ProductBuilder {

    static productFromJson(json: any): Product {
        const product = new Product();
        product.barcode = json.barcode;
        product.stock = json.stock;
        product.storageId = json.storageId;
        return product;
    }
    
    
    static productDetailFromJson(json: any): ProductDetail {
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
        
        const productDetail = new ProductDetail();
        productDetail.barcode = json.barcode;
        productDetail.stock = json.stock;
        productDetail.storageId = json.storageId;
        productDetail.price = json.price;
        productDetail.name = json.name;
        productDetail.composition = composition;
        productDetail.nutriScore = json.nutriScore;
        productDetail.imageSrc = json.imageSrc;
        productDetail.carbonFootprint = json.carbonFootprint;
        productDetail.allergens = json.allergens;
        productDetail.dietaryRestrictions = json.dietaryRestrictions;
        return productDetail;
    }
}

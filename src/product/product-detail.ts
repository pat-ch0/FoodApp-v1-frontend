import Composition from "./composition";
import Product from "./product";

export default class ProductDetail extends Product {
    price!: number;
    name!: string;
    composition!: Composition;
    nutriScore!: string;
    imageSrc!: string;
    carbonFootprint!: number;
    allergens!: string[];
    dietaryRestrictions!: string[];


    public formatAllergens(): string {
        return this.allergens && this.allergens.length > 0
            ? this.allergens.join(', ').replace(/en:/g, '')
            : 'Aucun allergène connu';
    }

    public formatPrice(): string {
        return this.price ? `${this.price.toFixed(2)}$` : 'Prix non spécifié';
    }

    public formatCarbonFootprint(): string {
        return this.carbonFootprint ? `${this.carbonFootprint} kg CO2e` : 'Empreinte carbone non spécifiée';
    }
}
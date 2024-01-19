import Composition from "./composition";

export default class Product {
    price: number;
    name: string;
    composition: Composition;
    nutriScore: string;
    imageSrc: string;
    carbonFootprint: number;
    allergens: string[];
    dietaryRestrictions: string[];

    constructor(
        price: number, 
        name: string, 
        composition: Composition, 
        nutriScore: string, 
        imageSrc: string, 
        carbonFootprint: number, 
        allergens: string[], 
        dietaryRestrictions: string[]
    ) {
        this.price = price;
        this.name = name;
        this.composition = composition;
        this.nutriScore = nutriScore;
        this.imageSrc = imageSrc;
        this.carbonFootprint = carbonFootprint;
        this.allergens = allergens;
        this.dietaryRestrictions = dietaryRestrictions;
    }

    formatAllergens(): string {
        return this.allergens && this.allergens.length > 0
            ? this.allergens.join(', ').replace(/en:/g, '')
            : 'Aucun allergène connu';
    }

    formatPrice(): string {
        return this.price ? `${this.price.toFixed(2)}$` : 'Prix non spécifié';
    }

    formatCarbonFootprint(): string {
        return this.carbonFootprint ? `${this.carbonFootprint} kg CO2e` : 'Empreinte carbone non spécifiée';
    }
}

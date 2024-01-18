export default class Product {
    price: number;
    name: string;
    composition: string[];
    nutriScore: string;
    imageSrc: string;
    carbonFootprint: number;
    allergens: string[];
    dietaryRestrictions: string[];

    constructor(
        price: number, 
        name: string, 
        composition: string[], 
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
}

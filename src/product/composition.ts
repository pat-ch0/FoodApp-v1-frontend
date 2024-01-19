import Ingredient from "./ingredient"

export default class Composition {
    public ingredients : Ingredient[] = [];
    public vegetarian : boolean = false;
    public vegan : boolean = false;

    

    formatDietaryRestrictions(): string {
        let restrictions = '';
        if (this.vegan) restrictions += "Végan";
        if (this.vegetarian) restrictions += restrictions.length > 0 ? " & Végétarien" : "Végétarien";
        if (!this.vegan && !this.vegetarian) restrictions = "Peut contenir des ingrédients non végétariens/végans";
        return restrictions;
    }

    formatIngredients(): string {
        return this.ingredients && this.ingredients.length > 0
            ? this.ingredients.map(ingredient => ingredient.formatText()).join(', ')
            : 'Composition non spécifiée';
    }
}
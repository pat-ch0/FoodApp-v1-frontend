export default class Ingredient {
    public id : String = "";
    public percent : number = 0;
    public percentEstimate : number = 0;
    public percentMax : number = 0;
    public percentMin : number = 0;
    public text : String = "";
    public vegan : boolean = false;
    public vegetarian : boolean = false;

    formatText(): String {
        return this.text;
    }
}
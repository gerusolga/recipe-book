import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

   private recipes: Recipe[] = [
    new Recipe('Smoothie', 'Strawberry Banana Smoothie', 'https://img1.russianfood.com/dycontent/images_upl/139/sm_138351.jpg', [
      new Ingredient('Banana', 1),
      new Ingredient('Strawberry', 7),
      new Ingredient('Water', 250),
    ]),
    new Recipe('Cookie', 'Cookies "Vzletnoye"', 'https://img1.russianfood.com/dycontent/images_upl/124/sm_123541.jpg', [
      new Ingredient('Flour', 400),
      new Ingredient('Sugar', 200),
      new Ingredient('Butter', 300),
      new Ingredient('Eggs', 3),
    ]),
    new Recipe('Salad', 'Salad with corn, cheese and eggs', 'https://img1.russianfood.com/dycontent/images_upl/348/sm_347474.jpg', [
      new Ingredient('Canned corn', 300),
      new Ingredient('Hard cheese', 200),
      new Ingredient('Eggs', 3),
      new Ingredient('Mayonnaise', 3),
    ]),
  ];


  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}



import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";

import {RecipeService} from "../recipes/resipe.service";
import {AuthService} from "../auth/auth.service";


@Injectable()

export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://recipe-book-yt-16a79-default-rtdb.europe-west1.firebasedatabase.app/recipes.json' + token, this.recipeService.getRecipes());

  }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get('https://recipe-book-yt-16a79-default-rtdb.europe-west1.firebasedatabase.app/recipes.' + token)
      .token(
        async (response: Response) => {
          const recipes: Recipe[] = await response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
